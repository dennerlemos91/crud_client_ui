import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Login from './pages/Login';
import Cliente from './pages/Cliente';


const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Cliente} path="/" exact/>
            <Route component={Login} path="/login"/>           
        </BrowserRouter>
    )
}

export default Routes;