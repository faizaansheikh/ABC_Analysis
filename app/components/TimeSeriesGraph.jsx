"use client";

import {
  Card,
  Divider,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"));

const TimeSeriesGraph = () => {
  var trace1 = {
    x: [1, 2, 3],
    y: [40, 50, 60],
    name: "yaxis data",
    type: "scatter",
  };

  var trace2 = {
    x: [2, 3, 4],
    y: [4, 5, 6],
    name: "yaxis2 data",
    yaxis: 'y2',
    type: "scatter",
  };

  var data = [trace1, trace2];

  var layout = {
    title: "Double Y Axis Example",
    yaxis: { title: "yaxis title" },
    yaxis2: {
      title: "yaxis2 title",
      titlefont: { color: "rgb(148, 103, 189)" },
      tickfont: { color: "rgb(148, 103, 189)" },
      overlaying: "y",
      side: "right",
    },
  };
  return (
    <Card
      sx={{
        boxShadow: "1px 1px 8px #80808085",
        marginTop: "50px",
        height: "435px",
      }}
    >
      <Typography sx={{ padding: 2 }}>TimeSeries of Selected data</Typography>
      <Divider />
      <FormControl sx={{ ml: "20px" }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="COGS" control={<Radio />} label="COGS" />
          <FormControlLabel value="Demand" control={<Radio />} label="Demand" />
        </RadioGroup>
      </FormControl>
      <Plot
        style={{ Width: "100%" }}
        // data={[

        //   {
        //     x: [
        //       "2000-01",
        //       "2000-02",
        //       "2000-03",
        //       "2000-04",
        //       "2000-05",
        //       "2000-06",
        //       "2000-07",
        //       "2000-08",
        //       "2000-09",
        //       "2000-10",
        //       "2000-11",
        //       "2000-12",
        //       "2001-01",
        //     ],
        //     y: [1, 2, 36, 45, 5, 64, 7, 45],
        //     yaxis2: {
        //       title: 'yaxis2 title',
        //       titlefont: {color: '#ff7f0e'},
        //       tickfont: {color: '#ff7f0e'},
        //       anchor: 'free',
        //       overlaying: 'y',
        //       side: 'left',
        //       position: 0.15
        //     },
        //     side: 'left',
        //     marker: { color: "blue" },
        //     name: "Bonus Regular",
        //     type: "scatter",
        //   },
        //   {
        //     x: [
        //       "2000-01",
        //       "2000-02",
        //       "2000-03",
        //       "2000-04",
        //       "2000-05",
        //       "2000-06",
        //       "2000-07",
        //       "2000-08",
        //       "2000-09",
        //       "2000-10",
        //       "2000-11",
        //       "2000-12",
        //       "2001-01",
        //     ],
        //     y: [1, 29, 36, 43, 5, 46, 67, 18],
        //     marker: { color: "Purple" },
        //     name: "Great Regular Flovour",
        //     type: "scatter",
        //   },
        //   {
        //     x: [
        //       "2000-01",
        //       "2000-02",
        //       "2000-03",
        //       "2000-04",
        //       "2000-05",
        //       "2000-06",
        //       "2000-07",
        //       "2000-08",
        //       "2000-09",
        //       "2000-10",
        //       "2000-11",
        //       "2000-12",
        //       "2001-01",
        //     ],
        //     y: [1, 25, 37, 44, 65, 46, 37, 81],
        //     marker: { color: "green" },
        //     name: "Brite Maximum power",
        //     type: "scatter",
        //   },
        // ]}
        data={data}
        layout={layout}
        config={{ responsive: true }}
      />
    </Card>
  );
};

export default TimeSeriesGraph;
