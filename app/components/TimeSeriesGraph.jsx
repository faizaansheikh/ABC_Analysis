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
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { resGraph } from "../setup/Services/SegmentationServices";
import { useEffect } from "react";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

const TimeSeriesGraph = ({ profileData, parseTimeseries }) => {
  if(parseTimeseries){
    console.log(parseTimeseries?.yaxis_names.y1);
  }
 
  // const [timeSerious, setTimeSerious] = useState({
  //   x: [],
  //   y: [],
  //   name: "",
  //   type: "",
  //   yaxis: "",
  // });

  // const { x, y, yaxis, name, type } = timeSerious;
  // console.log(x, y, name, yaxis, type);
//  let traces =  parseTimeseries?.map((vals)=>{
//     return(
//       let trace = {
//         x: x,
//         y: y,
//         name: name,
//         type: type,
//       };
//     )
//   })
  // let trace1 = {
  //   x: x,
  //   y: y,
  //   name: name,
  //   type: type,
  // };

  // let trace2 = {
  //   x: x,
  //   y: y,
  //   name: name,
  //   yaxis: yaxis,
  //   type: type,
  // };

  // let data = [trace1, trace2];

  let layout = {
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

  // const getGraph = async (query) => {
  //   const res = await resGraph(query);
  //   // console.log(res.data.data);
  //   res?.data?.data.map((elem) => {
  //     return setTimeSerious({
  //       x: elem.x,
  //       y: elem.y,
  //       name: elem.name,
  //       type: elem.type,
  //       yaxis: elem.yaxis,
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getGraph({ profile: profileData });
  // }, [profileData]);
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
          <FormControlLabel value="COGS" control={<Radio />} label={parseTimeseries && parseTimeseries?.yaxis_names.y1}/>
          <FormControlLabel value="Demand" control={<Radio />} label={parseTimeseries && parseTimeseries?.yaxis_names.y2} />
        </RadioGroup>
      </FormControl>
      <Plot
        style={{ Width: "100%" }}
        data = {parseTimeseries?.data}

        // setTimeout(() => {
        //   parseTimeseries?.data.map((vals)=>{
        //     return(
        //       vals
        //     )
        //   })
        //  }, 3000)
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
        // data={timeSerious}
        layout={layout}
        config={{ responsive: true }}
      />
    </Card>
  );
};

export default TimeSeriesGraph;
