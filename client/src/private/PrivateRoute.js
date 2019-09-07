import React from 'react';
import { useStoreState } from 'easy-peasy'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            true ? (<Component {...props} />) : (<Redirect to="/404" />)
        } 
    />
);


export default PrivateRoute
