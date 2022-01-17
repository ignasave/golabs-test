import request from 'supertest';
import {app} from '../../core/App';

it('responds with current user details', async () => {
    const cookie = await global.signin('test@test.com');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('id');
});

it('responds with null', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(Object.keys(response.body)).toHaveLength(0);
});


it('returns a 201 on succesful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@testcom',
            password: 'password'
        })
        .expect(400);
});


it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('disallows duplicates emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after succesful sign up', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
});


it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
});

it('fails when a user provides invalid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'passdsadsadasword'
        })
        .expect(400)
});

it('returns a jwt in a cookie when provides right credentials', async () => {
    const body = {
        email: 'test@test.com',
        password: 'password'
    };

    await request(app)
        .post('/api/users/signup')
        .send(body)
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send(body)
        .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined();
});

it('clear cookie when signout', async () => {
    const body = {
        email: 'test@test.com',
        password: 'password'
    };

    await request(app)
        .post('/api/users/signup')
        .send(body)
        .expect(201)

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200)

    expect(!response.get("Set-Cookie")).toBeDefined();
});

