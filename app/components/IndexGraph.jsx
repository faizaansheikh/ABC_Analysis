'use client'

import { Card, Divider, Typography } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import('react-plotly.js'));

const IndexGraph = () => {
    return (
        <Card sx={{ boxShadow: "1px 1px 8px #80808085", marginTop: "30px" }}>
            <Typography sx={{ padding: 2, fontSize: '20px' }}>Gini Index Graph</Typography>
            <Divider />

            <Plot
                style={{ Width: "100%" }}
                data={[
                    {
                        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 5, 6, 54, 12, 14, 45, 90],
                        marker: { color: "red" },
                        name: "Bonus Regular",
                        type: "scatter",
                    },
                    {
                        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        y: [14, 22, 35, 47, 53, 61, 72, 85],
                        marker: { color: "orange" },
                        name: "Bonus Tristar",
                        type: "scatter",
                    },
                    {
                        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 2, 36, 45, 5, 64, 7, 45],
                        marker: { color: "blue" },
                        name: "Brite Maximum power",
                        type: "scatter",
                    },
                    {
                        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 29, 36, 43, 5, 46, 67, 18],
                        marker: { color: "Purple" },
                        name: "Great Regular Flovour",
                        type: "scatter",
                    },
                    {
                        x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        y: [1, 25, 37, 44, 65, 46, 37, 81],
                        marker: { color: "green" },
                        name: "Max Bar Regular",
                        type: "scatter",
                    },
                ]}
                layout={
                    {
                        yaxis: {
                            title: 'Percent of Total',
                        },
                        xaxis: {
                            title: 'Time Step'
                        }
                    }
                }
                config={{ responsive: true }}
            />
        </Card>
    );
};

export default IndexGraph;