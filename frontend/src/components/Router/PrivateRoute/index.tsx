import { FC } from "react"
import { Navigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { RouteProps } from "../../../routes/routes"

interface Props {
    routeProps: RouteProps;
}

const PrivateRoute: FC<Props> = ({ routeProps }) => {
    const auth = useAuth();
    return auth ? routeProps.element() : <Navigate to='/login' />;
}

export default PrivateRoute
