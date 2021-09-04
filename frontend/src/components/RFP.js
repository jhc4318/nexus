import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


function Section() {
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
};

export default function RequestForProposal() {
    const [sections, setSections] = useState(null)

    useEffect(() => {
        axiosInstance
            .get('rfp/')
            .then((res) => {
                setSections(res.data);
            });
    }, []);

    if (!sections) return null;

    return (
        <React.Fragment>
            <CssBaseline />
            <Typography
                variant='h4'
            >
                RFP
            </Typography>
            <Grid container alignItems='center'>
                {sections.map((section) => {
                    return (
                        <Grid item key={section.id} xs={12}>
                            {section.title}
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};