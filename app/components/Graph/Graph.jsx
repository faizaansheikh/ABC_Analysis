"use client";

import React from "react";
import TimeSeriesGraph from "../TimeSeriesGraph";
import { Card, Divider, Grid, Typography } from "@mui/material";
import AttributeGraph from "../AttributeGraph";
import IndexGraph from "../IndexGraph";
import { useEffect } from "react";
import { useState } from "react";
// import "../summary.css";
const Graph = ({
  profileData,
  parseTimeseries,
  formattedArr,
  attgraph,
  giniGraph,
  cardsVal,
}) => {
  const [showGini, setShowGini] = useState(false);
  // console.log(cardsVal);
  const {
    GiniIndex,
    cv,
    color,
    cv_threshold,
    gini_threshold,
    message,
    slope,
    slope_threshold,
  } = cardsVal;
  return (
    <>
      <TimeSeriesGraph
        profileData={profileData}
        parseTimeseries={parseTimeseries}
        formattedArr={formattedArr}
      />

      <Grid
        container
        style={{ marginTop: "10px" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
            <Typography
              sx={{ padding: 2, fontWeight: "500", fontSize: "20px" }}
            >
              CV (Threshold {cv_threshold})
            </Typography>
            <Divider />
            <Typography variant="h4" sx={{ textAlign: "center", padding: 2,bgcolor:color === 0 ? "#398585" : '',color:color === 0 ? 'white' : '' }}>
              {cv}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
            <Typography
              sx={{ padding: 2, fontWeight: "500", fontSize: "20px" }}
            >
              Seasonality Effect (Threshold {gini_threshold})
            </Typography>
            <Divider />
            <Typography
              variant="h4"
              sx={{ textAlign: "center", padding: 2, bgcolor:color === 1 ? "#398585" : '',color:color === 1 ? 'white' : '' }}
            >
              {GiniIndex}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ boxShadow: "1px 1px 8px #80808085" }}>
            <Typography
              sx={{ padding: 2, fontWeight: "500", fontSize: "20px" }}
            >
              Slope (Threshold {slope_threshold})
            </Typography>
            <Divider />
            <Typography variant="h4" sx={{ textAlign: "center", padding: 2 ,bgcolor:color === 2 ? "#398585" : '',color:color === 2 ? 'white' : ''}}>
              {slope}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ boxShadow: "1px 1px 8px #80808085", marginTop: "30px" }}>
        <Typography
          variant="h6"
          sx={{ padding: "10px 30px", fontWeight: "500", fontSize: "23px" }}
        >
          {message}
        </Typography>
      </Card>

      <AttributeGraph attgraph={attgraph} />

      <IndexGraph giniGraph={giniGraph} />
    </>
  );
};

export default Graph;
