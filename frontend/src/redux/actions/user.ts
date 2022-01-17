import { login, loginProps, registerProps, register } from '../../services/auth';
import { user } from '../reducers/user';
import { SET_USER } from '../types/user';

export const userLogin = (body: loginProps, callback: () => void) => {
	return async (dispatch: any) => {
		const user = await login(body);
		if (user) {
			dispatch({
				type: SET_USER,
				payload: user,
			});
			callback();
		}
	};
};

export const userRegister = (body: registerProps, callback: () => void) => {
	return async (dispatch: any) => {
        const user = await register(body);
        if (user) {
            dispatch({
                type: SET_USER,
                payload: user,
            });
			callback();
        }
	};
};
