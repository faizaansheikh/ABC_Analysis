"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import dynamic from "next/dynamic";
import SummaryDialog from "./SummaryDialog";

import { getSummary } from "../setup/Services/SegmentationServices";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

import "./summary.css";

const SummaryCard = ({ profileData}) => {
  const [open, setOpen] = useState(false);
  const [summaryData, setSummaryData] = useState([]);

  const summaryDialogHandler = () => {
    setOpen(true);
  };

  const fetchSummary = async () => {
    const summaryRes = await getSummary();
   
    
    let parseSummary = JSON.parse(JSON.parse(summaryRes?.data).data)
     setSummaryData(parseSummary);
  };

  useEffect(() => {
    fetchSummary();
  }, [profileData]);

  let colorscaleValue = [
    [0, "#b1deb7"],
    [1, "#0a5413"],
  ];

  let yValues = ["A", "B", "C"];

  let xValues = ["Z", "Y", "X"];

  let zValues = summaryData;
 

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
            annotations: [],
          }}
          onClick={summaryDialogHandler}
          config={{ responsive: true }}
        />
       
        {/* </Suspense> */}
      </Card>
      {open ? <SummaryDialog profileData={profileData} setOpen={setOpen} open={open} /> : null}
    </>
  );
};

export default SummaryCard;
