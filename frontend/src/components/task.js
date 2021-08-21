import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const Tasks = (props) => {
    const { tasks } = props;
    if (!tasks || tasks.length === 0) return <p>No tasks found</p>;
    return (
        <React.Fragment>
            <Container maxWidth='md' component='main'>
                <Grid container spacing={5} alighItems='flex-end'>
                    {tasks.map((task) => {
                        return (
                            <Grid item key={task.id} xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h2'
                                        >
                                            {task.title.substr(0, 50)}
                                        </Typography>
                                        <Typography
                                            component='p'
                                            color='textPrimary'
                                        >
                                            {task.info.substr(0, 50)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Tasks;