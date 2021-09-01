import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';


export default function SignOut() {
    const history = useHistory();

    useEffect(() => {
        const response = axiosInstance.post('users/logout/blacklist/', { // eslint-disable-line
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.clear();
        axiosInstance.defaults.headers['Authorization'] = null;
        history.push('/login');
    });

    return <div>Logout</div>;
}