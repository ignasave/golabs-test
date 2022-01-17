import { SET_USER } from '../types/user';

export interface user {
	email: string;
	id: string;
}

interface Auth {
	user: user | null;
}

const initialState: Auth = {
	user: null,
};

export default (state = initialState, { type, payload }: { type: string; payload: any }) => {
	switch (type) {
		case SET_USER:
			return {
				...state,
				user: payload,
			};
		default:
			return state;
	}
};
