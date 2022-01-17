import Recipes from '../pages/Recipes';
import Login from '../pages/Login';

import paths from './paths';
import { ReactElement } from 'react';
import Register from '../pages/Register';

export interface Route {
	routeProps: RouteProps;
	layoutProps: LayoutProps;
}

export type RouteProps = {
	element: () => ReactElement;
	path: string;
	private?: boolean;
};

export type LayoutProps = {
	name?: string;
	inLayout?: boolean;
};

export const routes: Array<Route> = [
	{
		routeProps: { path: paths.login, element: Login },
		layoutProps: { name: 'Login', inLayout: true },
	},
	{
		routeProps: { path: paths.register, element: Register },
		layoutProps: { name: 'Register', inLayout: true },
	},
	{
		routeProps: { path: paths.recipes, element: Recipes, private: true },
		layoutProps: { inLayout: false },
	},
];
