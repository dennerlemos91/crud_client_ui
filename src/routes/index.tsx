import React from 'react';
import { Switch } from 'react-router-dom';

import CustomRouter from './Route'

import Login from '../pages/Login';
import Cliente from '../pages/Cliente';


const Routes = () => {

    return (
        <Switch>
            <CustomRouter isPrivate exact path="/" component={Cliente} />
            <CustomRouter exact path="/login" component={Login} />
        </Switch>
    )
}

export default Routes;