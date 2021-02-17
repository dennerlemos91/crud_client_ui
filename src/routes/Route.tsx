import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom'
import tokenService from '../services/token.service';


interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    return (
        <ReactDOMRoute {...rest} render={() => {
            debugger
            return isPrivate === tokenService.hasToken() ? (
                <Component />
            ) : (
                    <Redirect to={{ pathname: isPrivate ? '/login' : '/' }} />
                )
        }} />


    );
}

export default Route;