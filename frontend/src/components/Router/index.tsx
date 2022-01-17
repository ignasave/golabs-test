import { Route } from 'react-router';
import { Route as RouteType, routes } from '../../routes/routes';
import PrivateRoute from './PrivateRoute';

const Router = () => {
	return routes.map(({ routeProps }: RouteType) => {
		return (
			<Route
				key={routeProps.path}
				path={routeProps.path}
				element={routeProps.private ? <PrivateRoute routeProps={routeProps} /> : <routeProps.element />}
			/>
		);
	});
};

export default Router;
