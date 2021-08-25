import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


export default function Task(props) {
    return (
        <React.Fragment>
            <CssBaseline>
                <Card>
                    <CardContent>
                        <Typography
                            variant='caption'
                        >
                            TASK ID: {props.id}
                        </Typography>
                        <Typography>
                            {props.title}
                        </Typography>
                        <Typography>
                            {props.info}
                        </Typography>
                    </CardContent>                 
                </Card>
            </CssBaseline>
        </React.Fragment>
    );
}