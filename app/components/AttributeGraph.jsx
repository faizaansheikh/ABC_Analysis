"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getAttributeGraph } from "../setup/Services/SegmentationServices";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

import {
  Typography,
  FormControl,
  Card,
  Divider,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";

const AttributeGraph = ({
  attgraph,
  dropFilts,
  setFilterGraph,
  filterGraph,
  getOthersGraph,
  getDropFilters,
  attLoader,
  setAttLoader,
  profileData
}) => {
  
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  // const [loader, setLoader] = useState(false);
  
  // useEffect(() => {
  //   if (!defaultValuesSet && Object.keys(dropFilts).length > 0) {
  //     const defaultFilterValues = {};

  //     for (const key in dropFilts) {
  //       if (dropFilts.hasOwnProperty(key)) {
  //         defaultFilterValues[key] = dropFilts[key][0] || null;
  //       }
  //     }

  //     setFilterGraph((prevState) => ({
      
  //       profile:profileData,
  //       arr: {
  //         ...prevState.arr,
  //         ...defaultFilterValues,
  //       },
  //     }));
  //     // getOthersGraph()

  //     setDefaultValuesSet(true);
  //   }
  // }, [dropFilts]);
  const [defaultValuesSet, setDefaultValuesSet] = useState(false);
  useEffect(() => {
    if (Object.keys(dropFilts).length > 0) {
      const initialFilterValues = {};
      Object.keys(dropFilts).forEach((elem) => {
        if (dropFilts[elem]?.length > 0) {
          initialFilterValues[elem] = dropFilts[elem][0];
        }
      });
      setFilterGraph({
        profile: profileData,
        arr: { ...initialFilterValues },
      });
      setDefaultValuesSet(true)
    }
  }, [dropFilts, profileData]);
  // setDefaultValuesSet(true);
  useEffect(() => {
    if (defaultValuesSet) {
     
      getOthersGraph();
    }
  }, [defaultValuesSet]);

  const handleFilterValue = async (filterName, value) => {
    if (value === null) {
      const updatedFilts = { ...filterGraph.arr };
      delete updatedFilts[filterName];
      setFilterGraph((prevState) => ({
        ...prevState,
        arr: updatedFilts,
      }));
    } else {
      setFilterGraph((prevState) => ({
        ...prevState,
        arr: {
          ...prevState.arr,
          [filterName]: value,
        },
      }));
    }
    setShouldRunEffect(true);
    // setLoader(true)
  };

  useEffect(() => {
    if (shouldRunEffect) {
      getDropFilters();
      setAttLoader(true)
      getOthersGraph();
      setShouldRunEffect(false);
    }
  }, [shouldRunEffect]);

  if (attgraph) {
    attgraph.map((obj) => obj.type === "scatter");
  }
  // console.log(attgraph);
  return (
    <Card
      sx={{
        boxShadow: "1px 1px 8px #80808085",
        marginTop: "30px",
        height: "auto",
      }}
    >
      <Typography sx={{ padding: 2, fontSize: "25px" }}>
        Attribute Graph
      </Typography>
      <Divider />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
        {Object.keys(dropFilts).map((elem, index) => (
          <Grid item xs={4} key={index}>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={dropFilts[elem]?.map((opt) => opt)}
              sx={{ width: "100%", pl: "20px", pr: "20px" }}
              onChange={(event, value) => handleFilterValue(elem, value)}
              value={filterGraph.arr[elem] || null}
              renderInput={(params) => <TextField {...params} label={elem} />}
            />
          </Grid>
        ))}
      </Grid>
      {/* <Box
        sx={{ minWidth: 120, pl: "20px", pr: "20px", display: "flex" }}
      ></Box> */}
      {!attLoader ? (
        <Plot
          style={{ Width: "100%" }}
          data={attgraph}
          // data={[
          //   {
          //     x: [1, 2, 3, 4, 5, 6, 7, 8],
          //     y: [1, 5, 6, 54, 12, 14, 45, 90],
          //     // marker: { color: "red" },
          //     name: "Seasonality",
          //     type: "scatter",
          //   },
          //   {
          //     x: [1, 2, 3, 4, 5, 6, 7, 8],
          //     y: [1, 2, 36, 45, 5, 64, 7, 45],
          //     // marker: { color: "blue" },
          //     name: "Demand",
          //     type: "scatter",
          //   },
          //   {
          //     x: [1, 2, 3, 4, 5, 6, 7, 8],
          //     y: [1, 29, 36, 43, 5, 46, 67, 18],
          //     // marker: { color: "Purple" },
          //     name: "Residual",
          //     type: "scatter",
          //   },
          //   {
          //     x: [1, 2, 3, 4, 5, 6, 7, 8],
          //     y: [1, 25, 37, 44, 65, 46, 37, 81],
          //     // marker: { color: "green" },
          //     name: "Trend",
          //     type: "scatter",
          //   },
          // ]}
          layout={{
            // width: '100%',
            height: 600,
            autosize:true
            // title: "hello",
          }}
          config={{ responsive: false }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:'50px',
            mt:'200px',
            mb:'200px'

          }}
        >
          <CircularProgress />
     </Box>
      )}
    </Card>
  );
};

export default AttributeGraph;
