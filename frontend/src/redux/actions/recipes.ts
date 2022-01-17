import { getRecipes, postRecipe } from "../../services/recipes";
import { Recipe } from "../reducers/recipes";
import { SET_RECIPES } from "../types/recipes";

export const setRecipes = () => {
	return async (dispatch: any) => {
		const recipes = await getRecipes();
		if (recipes) {
			dispatch({
				type: SET_RECIPES,
				payload: recipes
			});
			
		}
	};
};

export const addRecipe = (recipe: Partial<Recipe>) => {
    return async (dispatch: any) => {
        await postRecipe(recipe);
        dispatch(setRecipes());
    }
}