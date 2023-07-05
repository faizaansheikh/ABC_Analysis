'use client'

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
const Plot = dynamic(() => import('react-plotly.js'))

const TimeSeriesGraph = () => {
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
        data={[
          {
            x: [
              "2000-01",
              "2000-02",
              "2000-03",
              "2000-04",
              "2000-05",
              "2000-06",
              "2000-07",
              "2000-08",
              "2000-09",
              "2000-10",
              "2000-11",
              "2000-12",
              "2001-01",
            ],
            y: [1, 5, 6, 54, 12, 14, 45, 90],
            marker: { color: "red" },
            name: "Bonus Tristar",
            type: "scatter",
          },
          {
            x: [
              "2000-01",
              "2000-02",
              "2000-03",
              "2000-04",
              "2000-05",
              "2000-06",
              "2000-07",
              "2000-08",
              "2000-09",
              "2000-10",
              "2000-11",
              "2000-12",
              "2001-01",
            ],
            y: [14, 22, 35, 47, 53, 61, 72, 85],
            marker: { color: "orange" },
            name: "Max Bar Regular",
            type: "scatter",
          },
          {
            x: [
              "2000-01",
              "2000-02",
              "2000-03",
              "2000-04",
              "2000-05",
              "2000-06",
              "2000-07",
              "2000-08",
              "2000-09",
              "2000-10",
              "2000-11",
              "2000-12",
              "2001-01",
            ],
            y: [1, 2, 36, 45, 5, 64, 7, 45],
            marker: { color: "blue" },
            name: "Bonus Regular",
            type: "scatter",
          },
          {
            x: [
              "2000-01",
              "2000-02",
              "2000-03",
              "2000-04",
              "2000-05",
              "2000-06",
              "2000-07",
              "2000-08",
              "2000-09",
              "2000-10",
              "2000-11",
              "2000-12",
              "2001-01",
            ],
            y: [1, 29, 36, 43, 5, 46, 67, 18],
            marker: { color: "Purple" },
            name: "Great Regular Flovour",
            type: "scatter",
          },
          {
            x: [
              "2000-01",
              "2000-02",
              "2000-03",
              "2000-04",
              "2000-05",
              "2000-06",
              "2000-07",
              "2000-08",
              "2000-09",
              "2000-10",
              "2000-11",
              "2000-12",
              "2001-01",
            ],
            y: [1, 25, 37, 44, 65, 46, 37, 81],
            marker: { color: "green" },
            name: "Brite Maximum power",
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

export default TimeSeriesGraph;