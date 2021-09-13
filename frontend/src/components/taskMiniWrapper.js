import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Components
import TaskMini from './taskMini';


export default function TaskMiniWrapper() {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        axiosInstance
            .get('tasks/')
            .then((response) => {
                setTasks(response.data);
            });
    }, []);

    if (!tasks) return null;

    return (
        <React.Fragment>
            <CssBaseline />
            <Typography
                variant='h4'
            >
                Tasks
            </Typography>
            <Grid container alignItems='center'>
                {tasks.map((task) => {
                    return (
                        <Grid item key={task.id} xs={12}>
                            <TaskMini id={task.id} title={task.title} info={task.info} author={task.author} assigned_to={task.assigned_to} status={task.status} slug={task.slug} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}