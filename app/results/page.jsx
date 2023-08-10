"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ResultsTable from "../components/ResultsTable";
import SummaryCard from "../components/SummaryCard";
import ProfileSection from "../components/ProfileSection";
import FilterSection from "../components/FilterSection";
import Graph from "../components/Graph/Graph";
import {
  getSummary,
  getProfile,
  getTable,
  resTable,
  resGraph,
} from "../setup/Services/SegmentationServices";

function Results() {
  const [profileData, setProfileData] = useState([]);
  const [dataT, setDataT] = useState({ columns: [], rows: [] });
  const [filterNames, setFilterNames] = useState([]);
  const [lookupApi, setLookupApi] = useState([]);

  const [showSummary, setShowSummary] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [timeSerious, setTimeSerious] = useState({
    x: [],
    y: [],
    name: "",
    type: "",
    yaxis: "",
  });
  const getGraph = async (query) => {

  };
  const filtersApi = async () => {
    const tableRes = await resTable({ profile: profileData });
    const filterRes = await getProfile({ mode: "all" });
    const graphData = await resGraph({ profile: profileData });
    // console.log(res.data.data);
    
    // debugger
    // console.log(tableRes?.data);
    let parseData = JSON.parse(tableRes?.data)
    console.log(parseData);
    setDataT({ columns: parseData?.columns, rows: parseData?.data });
    setShowSummary(true);
   
    if (parseData?.columns) {
      setShowSummary(true);
      setShowFilters(true)
     
      let parseFilterData = JSON.parse(filterRes?.data)
      setFilterNames(Object.keys(parseFilterData));
      setLookupApi(parseFilterData);
     
    }else{
      setShowSummary(false);
      setShowFilters(false)

    }
  };

  useEffect(() => {
    if(profileData.length){

      filtersApi();
    }
  }, [profileData]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sx={6} sm={12} md={12} lg={5.5}>
          <ProfileSection
            setProfileData={setProfileData}
            profileData={profileData}
          />
        </Grid>
        <Grid textAlign='center' item xs={12} sm={12} md={12} lg={6.5}>
          {showSummary ? <SummaryCard   profileData={profileData}/> : ''}
        </Grid>
      </Grid>
    {showFilters ? <FilterSection filterNames={filterNames} lookupApi={lookupApi} /> : ''}
      

      <Box sx={{ mt: "30px", boxShadow: "1px 1px 8px #80808085", p: "20px" }}>
        <Typography
          sx={{
            pr: "17px",
            pb: "17px",
            pl: "20px",
            fontSize: "20px",
          }}
        >
          {dataT.columns ?  'Results' : 'No results to show'}
         
        </Typography>
        <ResultsTable
          profileData={profileData}
          setDataT={setDataT}
          dataT={dataT}
        />
      </Box>

      <Graph profileData={profileData} timeSerious={timeSerious} />
    </>
  );
}

export default Results;
