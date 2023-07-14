'use client'

import React, { useState } from "react";
import { Card } from "@mui/material";
import dynamic from 'next/dynamic';
import SummaryDialog from "./SummaryDialog";

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false
})
import "./summary.css";

const SummaryCard = () => {

  const [open, setOpen] = useState(false);

  const summaryDialogHandler = () => {
    setOpen(true)
  }

  var colorscaleValue = [
    [0, "#b1deb7"],
    [1, "#0a5413"],
  ];

  var yValues = ['A', 'B', 'C'];

  var xValues = ['Z', 'Y', 'X'];

  var zValues = [
    [1, 20, 30],
    [20, 1, 60],
    [30, 60, 1],
  ]

  return (
    <>
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
              x: xValues,
              y: yValues,
              z: zValues,
              type: "heatmap",
              showscale: false,
              colorscale: colorscaleValue,
            },
          ]}
          layout={{
            height: 350,
            annotations: [
            ],
          }}
          onClick={summaryDialogHandler}
          config={{ responsive: true }}
        />
        {/* </Suspense> */}

      </Card>
      {open ? <SummaryDialog setOpen={setOpen} open={open} /> : null}
    </>
  );
};

export default SummaryCard;

