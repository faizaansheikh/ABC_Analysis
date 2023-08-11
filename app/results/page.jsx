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
  timeSeriesGraph,
  getGraphs,
} from "../setup/Services/SegmentationServices";

function Results() {
  const [profileData, setProfileData] = useState([]);
  const [dataT, setDataT] = useState({ columns: [], rows: [] });
  const [filterNames, setFilterNames] = useState([]);
  const [lookupApi, setLookupApi] = useState([]);

  const [showSummary, setShowSummary] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [timeSerious, setTimeSerious] = useState(false);
  // let parseTimeseries = []
  const filtersApi = async () => {
    const tableRes = await resTable({ profile: profileData });
    const filterRes = await getProfile({ mode: "all" });
    const timeseriesData = await timeSeriesGraph({ profile: profileData });
    const attGraph = await getGraphs({ profile: profileData })
    // console.log(JSON.parse(attGraph));
    let parseData = JSON.parse(tableRes?.data)
    
    setDataT({ columns: parseData?.columns, rows: parseData?.data });
    setShowSummary(true);
    
    if (parseData?.columns) {
      setShowSummary(true);
      setShowFilters(true)
      
      let parseFilterData = JSON.parse(filterRes?.data)
      setFilterNames(Object.keys(parseFilterData));
      setLookupApi(parseFilterData);
      setTimeSerious(JSON.parse(timeseriesData?.data))
    
    }else{
      setShowSummary(false);
      setShowFilters(false)

    }

  
   
    //  return parseTimeseries
    // console.log(parseTimeseries);
    // let xVal = parseTimeseries?.data.map(elem => elem.x)
    // console.log(xVal);
    
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

      <Graph profileData={profileData} parseTimeseries={timeSerious} />
    </>
  );
}

export default Results;
