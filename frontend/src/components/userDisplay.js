import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// Components
import UserMini from './userMini';


export default function UserDisplay() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axiosInstance
            .get('users/')
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    if (!users) return null;

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container alignItems='center'>
                {users.map((user) => {
                    return (
                        <Grid item key={users.indexOf(user)} xs={12}>
                            <UserMini id={users.indexOf(user)} user_name={user.user_name} email={user.email} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}