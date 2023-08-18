"use client";

import styled from "@emotion/styled";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import React from "react";
import {
  getBoxes,
  getProfile,
  tableFilters,
} from "../setup/Services/SegmentationServices";
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
// loadTableFilts
const FilterSection = ({
  filterNames,
  setFilterNames,
  lookupApi,
  setLookupApi,
  otherApis,
  setDataT,
  setLoader,
  loader,
}) => {
  const [load, setLoad] = useState(false);
  const [filtVals, setfiltVals] = useState({
    item: {
      profile: "Abc Brand-Grammage Wise_1",
    },
    filts: {},
  });
  const [filtersModified, setFiltersModified] = useState(false);

  const handleFilterValue = async (filterName, value) => {
    if (value === null) {
      // If value is null (deselected), remove the key from filts
      const updatedFilts = { ...filtVals.filts };
      delete updatedFilts[filterName];
      setfiltVals((prevState) => ({
        ...prevState,
        filts: updatedFilts,
      }));
    } else {
      setfiltVals((prevState) => ({
        ...prevState,
        filts: {
          ...prevState.filts,
          [filterName]: value,
        },
      }));
    }
    setFiltersModified(true);
  };

  const LoadTableFilts = async () => {
    if (filtersModified) {
      setLoader(true);
      const getTableFilts = await tableFilters(filtVals);
      let parseData = JSON.parse(getTableFilts?.data);
      setDataT({ columns: parseData?.columns, rows: parseData?.data });
      otherApis();
      setLoader(false);
    }
  };

  useEffect(() => {
    LoadTableFilts();
    
    setFiltersModified(false);
  }, [filtVals, filtersModified]);

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
                onChange={(event, value) => handleFilterValue(elem, value)}
                value={filtVals.filts[elem] || null}
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
