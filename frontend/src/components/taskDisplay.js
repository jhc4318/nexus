import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode';
import slugify from 'slugify';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
// Components
import TaskMiniWrapper from './taskMiniWrapper';
import { MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
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
}));

export default function TaskDisplay() {
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
        console.log(newTask);

        axiosInstance
            .post('tasks/', {
                title: newTask.title,
                info: newTask.info,
                author: newTask.author,
                slug: newTask.slug,
                assigned_to: newTask.assigned_to,
            })
    };

    if (!users) return null;

    return (
        <React.Fragment>
            <CssBaseline />
            <form noValidate>
                <TextField 
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    onChange={handleTaskChange}
                />
                <TextField 
                    required
                    fullWidth
                    id="info"
                    label="Info"
                    name="info"
                    autoComplete="info"
                    onChange={handleTaskChange}
                />
                <Select
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
                <Button
                    className={classes.button}
                    href="#"
                    color="primary"
                    variant="outlined"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
            <TaskMiniWrapper /> 
        </React.Fragment>
    );
};