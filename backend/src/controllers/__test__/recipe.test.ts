import request from 'supertest';
import { app } from '../../core/App';
import { Recipe } from '../../Models/Recipe';

it('has a route handler listening to /api/recipes for post requests', async () => {
	const response = await request(app).post('/api/recipes').send();

	expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
	await request(app).post('/api/recipes').send().expect(401);
});

it('return other status than 401 if already authenticated', async () => {
	const cookie = await global.signin('test@test.com');

	const response = await request(app).post('/api/recipes').set('Cookie', cookie).send();

	expect(response.status).not.toEqual(401);
});

it('returns a 400 error if invalid info is provided', async () => {
	const cookie = await global.signin('test@test.com');

	const response = await request(app)
		.post('/api/recipes')
		.set('Cookie', cookie)
		.send({
			title: '',
			description: '',
			duration: 0,
		})
		.expect(400);

	expect(response.body.errors.length).toEqual(3);
});

it('creates a recipe in the database', async () => {
	let recipes = await Recipe.find();
	expect(recipes.length).toEqual(0);
	const cookie = await global.signin('test@test.com');

	const body = {
		title: 'blabla',
		description: 'blablablablablabla',
		duration: 10,
	};

	await request(app).post('/api/recipes').set('Cookie', cookie).send(body).expect(201);

	recipes = await Recipe.find();

	expect(recipes.length).toEqual(1);

	const recipe = recipes[0];

	expect(recipe.title).toEqual(body.title);
	expect(recipe.description).toEqual(body.description);
	expect(recipe.duration).toEqual(body.duration);
});

it('returns only the user recipes', async () => {
	let cookie = await global.signin('test@test.com');

	const body = {
		title: 'blabla',
		description: 'blablablablablabla',
		duration: 10,
	};

	const response1 = await request(app).post('/api/recipes').set('Cookie', cookie).send(body).expect(201);

	cookie = await signin('test2@test.com');

	const response = await request(app).get('/api/recipes').set('Cookie', cookie).expect(200);

	expect(response.body).toHaveLength(0);
});

it('returns the user recipes', async () => {
	const cookie = await global.signin('test@test.com');

	const body = {
		title: 'blabla',
		description: 'blablablablablabla',
		duration: 10,
	};

	await request(app).post('/api/recipes').set('Cookie', cookie).send(body).expect(201);

	const response = await request(app).get('/api/recipes').set('Cookie', cookie).expect(200);

	const userRecipe = response.body[0];

	expect(response.body).toHaveLength(1);
	expect(userRecipe.title).toEqual(body.title);
	expect(userRecipe.description).toEqual(body.description);
	expect(userRecipe.duration).toEqual(body.duration);
});
