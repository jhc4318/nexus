import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// Components
import TaskCard from './taskCard';


export default function TaskCardWrapper() {
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
            <Grid container alignItems='center'>
                {tasks.map((task) => {
                    return (
                        <Grid item key={task.id} xs={12}>
                            <TaskCard id={task.id} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}