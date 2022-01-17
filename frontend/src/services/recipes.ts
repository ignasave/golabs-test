import { Recipe } from '../redux/reducers/recipes';
import axios from './axios';

export const getRecipes = async () => {
	const res = await axios.get('/recipes');
	return res.data;
};

export const postRecipe = async (recipe: Partial<Recipe>) => {
	const res = await axios.post('/recipes', recipe);
	return res.data;
};