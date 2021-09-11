import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export default function PrivateRoute ({ children, ...rest }) {

    const isAuthenticated = () => {
        try {
            jwt_decode(localStorage.getItem('access_token'));
            return true;
        } catch {
            console.log("Not authenticated");
            return false;
        }
    };

    return (
        <Route {...rest} render={() => {
            return isAuthenticated()
            ? children
            : <Redirect to='/login' />
        }} />
    );
};