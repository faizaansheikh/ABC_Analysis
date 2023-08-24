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

const SummaryCard = ({
  profileData,
  summaryData,
  loader,
  modalVals,
  xAxis,
  yAxis,
}) => {
  // console.log(summaryFilt);
  const [open, setOpen] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null); // To store the clicked point data
  // const [pointVals, setPointVals] = useState({
  //   x: null,
  //   y: null,
  // });

  const [modalData, setModalData] = useState({
    profile: "",
    abc: "",
    xyz: "",
  });
  const summaryDialogHandler = () => {
    setOpen(true);
  };

 

  const handlePlotClick = (event) => {
    if (event && event.points && event.points[0]) {
      const clickedPointData = event.points[0];
      setClickedPoint(clickedPointData);
      setModalData((prev) => ({
        profile:profileData,

        xyz: clickedPointData.x,
        abc: clickedPointData.y,
      }));
      summaryDialogHandler();
    }
  };

  // console.log(pointVals);
  let colorscaleValue = [
    [0, "#b1deb7"],
    [1, "#0a5413"],
  ];

  // let reverseValsY = [];

  // console.log(xValues, yValues);
  //  let zValues = reverseVals;
  // console.log(summaryData);
  let reverseValsZ = [];
  let yValues = xAxis;

  let xValues = yAxis;

  let zValues = summaryData;

  // for (let i = summaryData?.length - 1; i >= 0; i--) {
  //   reverseValsZ.push(summaryData[i]);
  // }
  let annotations = [];

  for (var i = 0; i < yValues.length; i++) {
    if (yValues[i] !== null) {
      for (var j = 0; j < xValues.length; j++) {
        if (xValues[j] !== null) {
          var currentValue = summaryData[i][j];
          if (currentValue !== 0.0) {
            var textColor = "white";
            var result = {
              xref: "x1",
              yref: "y1",
              x: xValues[j],
              y: yValues[i],
              text: `${summaryData[i][j]} Product(s)`,
              font: {
                family: "Arial",
                size: 30,
                color: "rgb(50, 171, 96)",
              },
              showarrow: false,
              font: {
                color: textColor,
              },
            };
            annotations.push(result);
          }
        }
      }
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
          autosize:true
        }}
        onClick={handlePlotClick} // Use the custom handler
        config={{ responsive: true }}
      />

      {open && clickedPoint ? (
        <SummaryDialog
          profileData={profileData}
          setOpen={setOpen}
          open={open}
          modalData={modalData}
          // pointVals={pointVals}
        />
      ) : null}
    </>
  );
};

export default SummaryCard;
