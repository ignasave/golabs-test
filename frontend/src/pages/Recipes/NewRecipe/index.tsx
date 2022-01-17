import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../../redux/actions/recipes";
import schema from "./schema";

const NewRecipe = () => {
    const dispatch = useDispatch()
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: any) => {
		dispatch(addRecipe(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="new-recipe">
			<h3>New Recipe</h3>
			<input type='text' placeholder='Title' {...register('title')} className='input'></input>
            <span className='error'>{errors.title?.message}</span>
			<input type='text' placeholder='Description' {...register('description')} className='input'></input>
            <span className='error'>{errors.title?.description}</span>
			<input type='number' placeholder='Duration in minutes' {...register('duration')} className='input'></input>
            <span className='error'>{errors.title?.duration}</span>
			<button className='button'>Add</button>
		</form>
	);
};

export default NewRecipe;
