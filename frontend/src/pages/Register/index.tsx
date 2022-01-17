import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerProps } from '../../services/auth';
import schema from './schema';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/actions/user';
import { useNavigate } from 'react-router';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: registerProps) => {
		dispatch(userRegister(data, () => navigate('/')));
	};

	return (
		<div className='container'>
			<h1>Register</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='email' {...register('email')} className='input'></input>
				<span className='error'>{errors.email?.message}</span>
				<input type='password' {...register('password')} className='input'></input>
				<span className='error'>{errors.password?.message}</span>
				<button className='button'>Register</button>
			</form>
		</div>
	);
};

export default Register;
