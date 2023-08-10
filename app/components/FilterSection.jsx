"use client";

import styled from "@emotion/styled";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import React from "react";
import { getBoxes, getProfile } from "../setup/Services/SegmentationServices";
import { useEffect } from "react";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#398585",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#398585",
    },
    "&:hover fieldset": {
      borderColor: "#398585",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#398585",
    },
  },
});
let dataF = [
  { ABC: ["A", "B", "C"] },
  {
    Brand: [
      "Bonus Regular",
      "Bonus Tristar",
      "Brite Maximum Power",
      "Great Regular Flavour",
      "Max Bar Regular",
    ],
  },
  { Measure: ["COGS", "Demand"] },
  { Plant: ["PK50", "PK51", "PK56"] },
  { XYZ: ["X", "Y", "Z"] },
];
const FilterSection = ({filterNames,setFilterNames,lookupApi,setLookupApi}) => {
 
  // const getFilterBox = async () => {
  //   const res = await getProfile({ mode: "all" });
  //   setFilterNames(Object.keys(res.data));
  //   setLookupApi(res.data);
  // };
  // // console.log(lookupApi);
  // useEffect(() => {
  //   getFilterBox();
  // }, []);
  return (
    <Grid
      container
      gap={2}
      sx={{
        display: "flex",
        textAlign: "center",
        marginTop: "50px",
        justifyContent: "center",
      }}
    >
      {filterNames.map((elem) => {
        return (
          <Grid item xs={12} sm={8} md={4} lg={3.5}>
            <Card
              sx={{
                boxShadow: "1px 1px 8px #80808085",
                padding: "7px 20px 20px",
                backgroundColor: "#71807a",
                color: "white",
                // width:'400px'
              }}
            >
              <p
                style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}
              >
                {elem}
              </p>
              <Autocomplete
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                fullWidth
                size="small"
                disablePortal
                id="combo-box-demo"
                options={lookupApi[elem].map((opt) => opt)}
                renderInput={(params) => <CssTextField {...params} />}
              />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FilterSection;
