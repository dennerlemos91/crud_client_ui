import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './Route'

import Login from '../pages/Login';
import Cliente from '../pages/Cliente';

const Routes = () => {

    return (
        <BrowserRouter>
            <Route component={Cliente} path="/" exact isPrivate />
            <Route component={Login} path="/login" />
        </BrowserRouter>
    )
}

export default Routes;