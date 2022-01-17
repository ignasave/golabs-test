import { FC } from 'react';
import { Recipe as RecipeType } from '../../../redux/reducers/recipes';

interface Props {
	recipe: RecipeType;
}
const Recipe: FC<Props> = ({ recipe }) => {
	return (
		<div className='recipe'>
			<div className='recipe-row'>
				<p>Title</p>
				<p>{recipe.title}</p>
			</div>
			<div className='recipe-row'>
				<p>Description</p>
				<p>{recipe.description}</p>
			</div>
			<div className='recipe-row'>
				<p>Duration in minutes</p>
				<p>{recipe.duration}</p>
			</div>
		</div>
	);
};

export default Recipe;
