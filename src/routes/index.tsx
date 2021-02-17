import React from 'react';
import { Switch } from 'react-router-dom';

import CustomRouter from './Route'

import Login from '../pages/Login';
import Cliente from '../pages/Cliente';
import ClienteForm from '../pages/Cliente/cliente-form/index';


const Routes = () => {

    return (
        <Switch>
            <CustomRouter isPrivate exact path="/" component={Cliente} />
            <CustomRouter isPrivate path="/novo" component={ClienteForm} />
            <CustomRouter isPrivate path="/edit/:id" component={ClienteForm} />
            <CustomRouter exact path="/login" component={Login} />
        </Switch>
    )
}

export default Routes;