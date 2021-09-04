import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default function Section(props) {
    const [section, setSection] = useState(null);
    const [subsections, setSubsections] = useState(null);

    useEffect(() => {
        axiosInstance
            .get(`rfp/${props.id}`)
            .then((res) => {
                setSection(res.data);
            });
    }, [props.id]);

    useEffect(() => {
        axiosInstance
            .get(`rfp/${props.id}/subsections`)
            .then((res) => {
                setSubsections(res.data);
            });
    }, [props.id]);

    if (!section) return null;
    if (!subsections) return null;

    return (
        <React.Fragment>
            <CssBaseline />
            <Card>
                <CardContent>
                    <Typography>
                        {section.title}
                    </Typography>
                    <Typography>
                        {section.info}
                    </Typography>  
                    {subsections.map((newSection) => {
                        return (
                            <Section id={newSection.id} />
                        )
                    })}   
                </CardContent>
            </Card> 
        </React.Fragment>
    );
};