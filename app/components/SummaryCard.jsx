'use client'

import React from "react";
import { Card } from "@mui/material";
import dynamic from 'next/dynamic';
// const SummaryPlot = lazy(() => import("../components/react-plotly.js"));
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false
})
import "./summary.css";
// import { lazy } from "react";
// import { Suspense } from "react";

const SummaryCard = () => {
  var colorscaleValue = [
    [0, "#b1deb7"],
    [1, "#0a5413"],
  ];

  return (
    <Card sx={{ boxShadow: "1px 1px 8px #80808085", height: "300px" }}>
      <p style={{ textAlign: "center", fontSize: "25px", margin: "7px 0px" }}>
        Summary
      </p>
      {/* <Suspense fallback="loading..."> */}
      <Plot
        style={{ width: "100%" }}
        className="js-plotly-plot plotly main-svg"
        data={[
          {
            x: ["Z", "Y", "X"],
            y: ["A", "B", "C"],
            z: [
              [1, 20, 30],
              [20, 1, 60],
              [30, 60, 1],
            ],
            type: "heatmap",
            showscale: false,
            colorscale: colorscaleValue,
          },
        ]}
        layout={{
          height: 350,
        }}
        config={{ responsive: true }}
      />
          {/* </Suspense> */}
     
    </Card>
  );
};

export default SummaryCard;
