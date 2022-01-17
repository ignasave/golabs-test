import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginProps } from '../../services/auth';
import schema from './schema';
import { userLogin } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: loginProps) => {
		dispatch(userLogin(data, () => navigate('/')));
	};

	return (
		<div className='container'>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='email' {...register('email')} placeholder='email' className='input'></input>
				<span className='error'>{errors.email?.message}</span>
				<input type='password' {...register('password')} className='input' placeholder='password'></input>
				<span className='error'>{errors.password?.message}</span>
				<button className='button'>Login</button>
			</form>
		</div>
	);
};

export default Login;
