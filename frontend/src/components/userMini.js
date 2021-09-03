import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
    },
    userID: {
        textAlign: 'right',
        fontStyle: 'italic',  
    },
    username: {
        fontWeight: 'bold',
    },
    taskAuthor: {
        textAlign: 'left',
        fontStyle: 'italic', 
    },
}));

export default function UserMini(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline>
                <Card>
                    <CardContent>
                        <div className={classes.userID}>
                            <Typography
                                variant='caption' 
                                display='block'
                            >
                                USER ID: {props.id}
                            </Typography>
                        </div>
                        <div className={classes.username}>
                            <Typography
                                noWrap={true}
                                variant='subtitle1'
                                align='left'
                                display='block'
                            >
                                {props.user_name}
                            </Typography>
                        </div>
                        <Typography
                            noWrap={true}
                            variant='body2'
                            align='left'
                        >
                            {props.email}
                        </Typography>
                    </CardContent>                 
                </Card>
            </CssBaseline>
        </React.Fragment>
    );
}