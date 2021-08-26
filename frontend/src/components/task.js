import React from 'react';
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
}));

export default function Task(props) {
    const classes = useStyles();


    return (
        <React.Fragment>
            <CssBaseline>
                <Card>
                    <CardContent>
                        <span>
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
                        </span>
                        
                        <Typography
                            noWrap={true}
                            variant='body2'
                            align='left'
                        >
                            {props.info}
                        </Typography>
                    </CardContent>                 
                </Card>
            </CssBaseline>
        </React.Fragment>
    );
}