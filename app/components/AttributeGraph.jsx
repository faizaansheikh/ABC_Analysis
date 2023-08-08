'use client'

import React, { useState } from "react";
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'));

import {
    Typography,
    FormControl,
    Card,
    Divider,
    Autocomplete,
    TextField,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
const AttributeGraph = () => {
    const [drop, setDrop] = useState('')
    return (
        <Card
            sx={{
                boxShadow: "1px 1px 8px #80808085",
                marginTop: "30px",
                height: "495px",
            }}
        >
            <Typography sx={{ padding: 2 }}>Attribute Graphs</Typography>
            <Divider />
            <Box sx={{ minWidth: 120, pl: '20px', pr: '20px' }}>
                <FormControl sx={{ pb: '15px', pt: '15px' }} fullWidth>
                    <Select
                        size="small"
                        id="demo-simple-select"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                    >
                        <MenuItem value='Bonus Regular'> Bonus Regular</MenuItem>
                        <MenuItem value='Bonus Trister'> Bonus Trister</MenuItem>
                        <MenuItem value='Brite Maximum Power'> Brite Maximum Power</MenuItem>
                        <MenuItem value='Great Regular Flavour'>Great Regular Flavour</MenuItem>
                        <MenuItem value='Max Bar Regular'> Max Bar Regular</MenuItem>
                        <MenuItem value='0'> 0</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={[1, 2, 3, 4, 5, 6]}
                sx={{ width: "100%", pl: "20px", pr: "20px" }}
                renderInput={(params) => <TextField {...params} label="110-70 GM" />}
            />
            <Plot
                style={{ Width: "100%" }}
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 5, 6, 54, 12, 14, 45, 90],
                        // marker: { color: "red" },
                        name: "Seasonality",
                        type: "scatter",
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 2, 36, 45, 5, 64, 7, 45],
                        // marker: { color: "blue" },
                        name: "Demand",
                        type: "scatter",
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 29, 36, 43, 5, 46, 67, 18],
                        // marker: { color: "Purple" },
                        name: "Residual",
                        type: "scatter",
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 25, 37, 44, 65, 46, 37, 81],
                        // marker: { color: "green" },
                        name: "Trend",
                        type: "scatter",
                    },
                ]}
                layout={
                    {
                        // width: '100%',
                        // height: 600,
                        // title: "hello",
                    }
                }
                config={{ responsive: true }}
            />
        </Card>
    );
};

export default AttributeGraph;