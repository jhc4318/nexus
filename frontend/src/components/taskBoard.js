import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode';
import slugify from 'slugify';
import { 
    Button, 
    Card, 
    CardContent, 
    Checkbox, 
    CssBaseline, 
    Grid, 
    Input, 
    ListItemText, 
    makeStyles, 
    MenuItem, 
    Select, 
    TextField, 
    Typography
} from '@material-ui/core';
import TaskCardWrapper from './taskCardWrapper';


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    card: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    selectNames: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
}));

export default function TaskBoard() {
    const classes = useStyles();
    const [users, setUsers] = useState(null);
    const initNewTask = Object.freeze({
        title: '',
        info: '',
        author: '',
        slug: '',
        assigned_to: [],
    });
    const [newTask, updateNewTask] = useState(initNewTask);

    useEffect(() => {
        axiosInstance
            .get('users/')
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    const handleTaskChange = (e) => {
        updateNewTask({
            ...newTask,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleAssigneesChange = (e) => {
        updateNewTask({
            ...newTask,
            assigned_to: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        newTask.author = jwt_decode(localStorage.getItem('access_token')).user_id;
        newTask.slug = slugify(newTask.title, { lower: true })

        axiosInstance
            .post('tasks/', {
                title: newTask.title,
                info: newTask.info,
                author: newTask.author,
                slug: newTask.slug,
                assigned_to: newTask.assigned_to,
                status: "in_progress",
            })
    };

    if (!users) return null;

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Card variant='outlined' className={classes.card}>
                    <CardContent>
                        <form noValidate>
                            <Grid container>
                                <Grid item xs={12} >
                                    <TextField 
                                        required
                                        fullWidth
                                        id="title"
                                        label="New task title"
                                        name="title"
                                        autoComplete="title"
                                        onChange={handleTaskChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        required
                                        fullWidth
                                        multiline
                                        id="info"
                                        label="Info"
                                        name="info"
                                        autoComplete="info"
                                        onChange={handleTaskChange}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Select
                                        className={classes.selectNames}
                                        multiple
                                        input={<Input />}
                                        value={newTask.assigned_to}
                                        // fullWidth
                                        renderValue={(selected) => {
                                            let names = [];
                                            for (const index of selected) {
                                                names.push(users[index].user_name)
                                            }
                                            return names.join(', ')
                                        }}
                                        onChange={handleAssigneesChange}
                                    >
                                        {users.map((user) => {
                                            return (
                                                <MenuItem key={users.indexOf(user)} value={users.indexOf(user)}>
                                                    <Checkbox checked={newTask.assigned_to.indexOf(users.indexOf(user)) > -1} />
                                                    <ListItemText primary={user.user_name} />
                                                </MenuItem> 
                                            );
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        className={classes.button}
                                        href="#"
                                        color="primary"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                <TaskCardWrapper /> 
            </React.Fragment>
        </div> 
    );
};