import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default function TaskWrapper() {
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
            {tasks.map((task) => {
                return (
                    <Card>
                        <CardContent>
                            <Typography>
                                {task.id}: {task.title}
                            </Typography>
                            <Typography>
                                {task.info}
                            </Typography>
                        </CardContent>                 
                    </Card>
                );
            })}
        </React.Fragment>
    );
}