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
    taskID: {
        textAlign: 'right',
        fontStyle: 'italic',  
    },
    taskTitle: {
        fontWeight: 'bold',
    },
    taskAuthor: {
        textAlign: 'left',
        fontStyle: 'italic', 
    },
}));

export default function Task(props) {
    const classes = useStyles();
    const [author, setAuthor] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`users/${props.author}`)
            .then((response) => {
                setAuthor(response.data)
            });
    }, [props.author]);

    useEffect(() => {
        const promises = props.assigned_to.map(id => {
            return axiosInstance
                .get(`users/${id}`)
                .then((response) => {
                    return response.data;
                })
        });
        Promise.all(promises).then(results => setUsers(results))
    }, [props.assigned_to])

    if (!author) return null;
    // console.log(users)

    return (
        <React.Fragment>
            <CssBaseline>
                <Card>
                    <CardContent>
                        <div className={classes.taskID}>
                            <Typography
                                variant='caption' 
                                display='block'
                            >
                                TASK ID: {props.id}
                            </Typography>
                        </div>
                        <div className={classes.taskTitle}>
                            <Typography
                                noWrap={true}
                                variant='subtitle1'
                                align='left'
                                display='block'
                            >
                                {props.title}
                            </Typography>
                        </div>
                        <Typography
                            noWrap={true}
                            variant='body2'
                            align='left'
                        >
                            {props.info}
                        </Typography>
                        <div className={classes.taskAuthor}>
                            <Typography
                                variant='caption' 
                                display='inline'
                            >
                                Created by {author.user_name} -
                            </Typography>
                            <Typography
                                variant='caption' 
                                display='inline'
                            >
                                {users.map((user) => {
                                    return (
                                        `| ${user.user_name} `
                                    );
                                })}  
                            </Typography>
                        </div>
                    </CardContent>                 
                </Card>
            </CssBaseline>
        </React.Fragment>
    );
}