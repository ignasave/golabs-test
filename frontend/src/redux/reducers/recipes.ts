import { SET_RECIPES } from '../types/recipes';

export type Recipe = {
    id: string;
    title: string;
    description: string;
    duration: number;
}

interface Auth {
	recipes: Recipe[];
}

const initialState: Auth = {
	recipes: [
        {
            id: '1',
            title: 'Recipe 1',
            description: 'Description 1',
            duration: 1,
        },
        {
            id: '2',
            title: 'Recipe 2',
            description: 'Description 2',
            duration: 2,
        },
        {
            id: '3',
            title: 'Recipe 3',
            description: 'Description 3',
            duration: 3,
        },
        
    ],
};

export default (state = initialState, { type, payload }: { type: string; payload: any }) => {
	switch (type) {
		case SET_RECIPES:
			return {
				...state,
				recipes: payload,
			};
		default:
			return state;
	}
};
