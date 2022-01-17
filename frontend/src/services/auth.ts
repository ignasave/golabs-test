import axios from './axios';
import { user } from '../redux/reducers/user';

export interface loginProps {
	email: string;
	password: string;
}

export const login = async (body: loginProps): Promise<user> => {
	const res = await axios.post('/users/signin', body);
	return res.data;
};

export interface registerProps {
	email: string;
	password: string;
}

export const register = async (body: registerProps): Promise<user> => {
	const res = await axios.post('/users/signup', body);
	return res.data;
};
