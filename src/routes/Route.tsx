import React, { useContext } from 'react';
import { Route, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom'
import { AuthContext } from '../hooks/AuthContext';

import Loading from '../components/Loading'

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType
}

const CustomRouter: React.FC<RouteProps> = ({ isPrivate, ...rest }) => {
    const { loading, authenticated } = useContext(AuthContext);

    if (loading) {
        return <Loading />;

    }

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />
}

export default CustomRouter;