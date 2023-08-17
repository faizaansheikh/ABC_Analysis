"use-client";
import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import dynamic from "next/dynamic";
import SummaryDialog from "./SummaryDialog";

import { getSummary } from "../setup/Services/SegmentationServices";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

import "./summary.css";

const SummaryCard = ({ profileData, summaryData, loader, modalVals }) => {
  const [open, setOpen] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null); // To store the clicked point data
  const [pointVals, setPointVals] = useState({
    x: null,
    y: null,
  });
  const summaryDialogHandler = () => {
    setOpen(true);
  };

  const handlePlotClick = (event) => {
    if (event && event.points && event.points[0]) {
      const clickedPointData = event.points[0];
      setClickedPoint(clickedPointData);
      setPointVals({
        x: clickedPointData.x,
        y: clickedPointData.y,
      });
      summaryDialogHandler();
    }
  };
    
  // console.log(pointVals);
  let colorscaleValue = [
    [0, "#b1deb7"],
    [1, "#0a5413"],
  ];

  let yValues = ["C", "B", "A"];

  let xValues = ["X", "Y", "Z"];

   let zValues = summaryData;
   let annotations = [];
   for (let rowIndex = 0; rowIndex < yValues.length; rowIndex++) {
     for (let colIndex = 0; colIndex < xValues.length; colIndex++) {
      const value = summaryData[rowIndex][colIndex];
      const colorStyle = value > 9 ? "color: white;" : "";
       const annotation = {
         x: xValues[colIndex],
         y: yValues[rowIndex],
         text: `<span style="${colorStyle}">${summaryData[rowIndex][colIndex]} Products </span>`,
         xref: "x",
         yref: "y",
         showarrow: false,
       };
       annotations.push(annotation);
     }
   }
 

  return (
    <>
      <Plot
        style={{ width: "100%" }}
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
          annotations: annotations,
        }}
        onClick={handlePlotClick} // Use the custom handler
        config={{ responsive: true }}
      />

      {open && clickedPoint ? (
        <SummaryDialog
          profileData={profileData}
          setOpen={setOpen}
          open={open}
          modalVals={modalVals}
          pointVals={pointVals} 
        />
      ) : null}
    </>
  );
};

export default SummaryCard;
