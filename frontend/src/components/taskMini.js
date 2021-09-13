import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Checkbox, FormControlLabel } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
    },
    taskID: {
        // textAlign: 'right',
        fontStyle: 'italic',  
    },
    taskTitle: {
        fontWeight: 'bold',
    },
    taskAuthor: {
        textAlign: 'left',
        fontStyle: 'italic', 
    },
    checkbox: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}));

export default function TaskMini(props) {
    const classes = useStyles();

    const [task, setTask] = useState(null);
    useEffect(() => { // Get task data
        axiosInstance
            .get(`tasks/${props.id}`)
            .then((response) => {
                setTask(response.data)
            });
    }, [props.id])
    
    const [author, setAuthor] = useState(null);
    useEffect(() => { // Get user for author
        if (task) {
            axiosInstance
                .get(`users/${task.author}`)
                .then((response) => {
                    setAuthor(response.data)
                });
        }
    }, [task]);

    const [users, setUsers] = useState([]);
    useEffect(() => { // Get users for assigned_to
        if (task) {
            const promises = task.assigned_to.map(id => {
                return axiosInstance
                    .get(`users/${id}`)
                    .then((response) => {
                        return response.data;
                    })
            });
            Promise.all(promises).then(results => setUsers(results))
        }
    }, [task]);

    const [complete, setComplete] = useState(false);
    useEffect(() => { // Update complete based on task.status
        if (task) {
            setComplete(task.status === "complete");
        }
    }, [task]);

    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        setCurrentUser(jwt_decode(localStorage.getItem('access_token')).user_id);
    }, [])

    const handleCheckbox = (e) => { 
        setComplete(e.target.checked);
        axiosInstance
            .put(`tasks/${task.id}/`, {
                title: task.title,
                info: task.info,
                author: task.author,
                slug: task.slug,
                status: e.target.checked ? "complete" : "in_progress",
            })
    };
    
    if (!task) return null;
    if (!author) return null;
    if (!users) return null;
    if (!currentUser) return null;

    return (
        <React.Fragment>
            <CssBaseline>
                <Card>
                    <CardContent>
                        <span className={classes.taskID}>
                                <Typography
                                variant='subtitle1' 
                                display='inline'
                                color='textSecondary'
                            >
                                {task.id} -{" "}
                            </Typography>
                        </span>
                        <Typography
                            noWrap={true}
                            variant='subtitle1'
                            align='left'
                            display='inline'
                        >
                            {task.title}
                        </Typography>
                        <Typography
                            noWrap={true}
                            variant='body2'
                            align='left'
                        >
                            {task.info}
                        </Typography>
                        <div className={classes.taskAuthor}>
                            <Typography
                                variant='caption' 
                                display='inline'
                            >
                                Created by {author.user_name} {"for "}
                            </Typography>
                            <Typography
                                variant='caption' 
                                display='inline'
                            >
                                {users.map((user) => {
                                    return (
                                        `${user.user_name} `
                                    );
                                })}  
                            </Typography>
                            <FormControlLabel
                                className={classes.checkbox}
                                label="Mark as completed"
                                labelPlacement="start"
                                control={<Checkbox 
                                    checked={complete}  
                                    onChange={handleCheckbox} 
                                    name="complete" 
                                    disabled={!((task.assigned_to.includes(currentUser)) || (task.author===currentUser))}
                                />}
                            />
                        </div>
                    </CardContent>                 
                </Card>
            </CssBaseline>
        </React.Fragment>
    );
}