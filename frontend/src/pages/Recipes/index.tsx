import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../redux/actions/recipes';
import { Recipe as RecipeType } from '../../redux/reducers/recipes';
import NewRecipe from './NewRecipe';
import Recipe from './Recipe';

const Recipes = () => {
    const dispatch = useDispatch();
	const { recipes } = useSelector((state: RootStateOrAny) => state.recipes);
    
	useEffect(() => {
        dispatch(setRecipes())
    }, [])

	return (
		<div>
			<h1>Recipes</h1>
			<div>
                <NewRecipe />
				<div className='recipes'>
					{recipes.map((recipe: RecipeType) => (
						<Recipe recipe={recipe} key={recipe.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Recipes;
