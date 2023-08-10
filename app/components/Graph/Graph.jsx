'use client'

import React from 'react'
import TimeSeriesGraph from '../TimeSeriesGraph';
import { Card, Divider, Grid, Typography } from '@mui/material';
import AttributeGraph from '../AttributeGraph';
import IndexGraph from '../IndexGraph';

const Graph = ({profileData, timeSerious}) => {
    return (
        <>
            <TimeSeriesGraph profileData={profileData} timeSerious={timeSerious}/>

            <Grid container style={{ marginTop: '10px' }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
                        <Typography sx={{ padding: 2 }}>CV (Threshold: 0.2)</Typography>
                        <Divider />
                        <Typography variant="h4" sx={{ textAlign: 'center', padding: 2 }}>0.4356</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
                        <Typography sx={{ padding: 2 }}>Seasonality Effect (Threshold: 0.1)</Typography>
                        <Divider />
                        <Typography variant="h4" sx={{ textAlign: 'center', padding: 2 }}>0.4356</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
                        <Typography sx={{ padding: 2 }}>Slope (Threshold: 0.0002)</Typography>
                        <Divider />
                        <Typography variant="h4" sx={{ textAlign: 'center', padding: 2 }}>0.4356</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Card sx={{ boxShadow: "1px 1px 8px #80808085", marginTop: '30px' }}>
                <Typography variant='h6' sx={{ padding: '10px 30px' }}>This item has been classified as Y because the value of Gini Index is greater than or equal to 0.1</Typography>
            </Card>

            <AttributeGraph />

            <IndexGraph />
        </>
    )
}

export default Graph