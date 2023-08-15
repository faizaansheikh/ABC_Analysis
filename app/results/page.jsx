"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import ResultsTable from "../components/ResultsTable";
import SummaryCard from "../components/SummaryCard";
import ProfileSection from "../components/ProfileSection";
import FilterSection from "../components/FilterSection";
import Graph from "../components/Graph/Graph";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getSummary,
  getProfile,
  getTable,
  resTable,
  resGraph,
  timeSeriesGraph,
  getGraphs,
  getOtherGraphs,
} from "../setup/Services/SegmentationServices";

function Results() {
  const [profileData, setProfileData] = useState([]);
  const [dataT, setDataT] = useState({ columns: [], rows: [] });
  const [filterNames, setFilterNames] = useState([]);
  const [lookupApi, setLookupApi] = useState([]);

  const [showSummary, setShowSummary] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [timeSerious, setTimeSerious] = useState(false);
  const [attgraph, setAttgraph] = useState(false);
  const [giniGraph, setGniGraph] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cardsVal, setCardsVal] = useState(false);
  const [filterGraph, setFilterGraph] = useState({
    profile: "Abc Brand-Grammage Wise_1",
    arr: {
      Brand: "Bonus Regular",
      Grammage: "110-70 GM",
    },
  });
  
  // let parseTimeseries = []
  const filtersApi = async () => {
    setLoader(true);
    const tableRes = await resTable({ profile: profileData });
    const filterRes = await getProfile({ mode: "all" });
    const summaryRes = await getSummary();
    const timeseriesData = await timeSeriesGraph({ profile: profileData });
    const otherGraphs = await getOtherGraphs(filterGraph);


    // console.log(JSON.parse(parseOtherGraphs.data));
    setLoader(false);
    // console.log(JSON.parse(attGraph));
    let parseData = JSON.parse(tableRes?.data);

    setDataT({ columns: parseData?.columns, rows: parseData?.data });

    setShowSummary(true);

    if (parseData?.columns) {
      setShowSummary(true);
      setShowFilters(true);

      let parseFilterData = JSON.parse(filterRes?.data);
      setFilterNames(Object.keys(parseFilterData));
      setLookupApi(parseFilterData);

      let parseSummary = JSON.parse(JSON.parse(summaryRes?.data).data);
      setSummaryData(parseSummary);

      setTimeSerious(JSON.parse(timeseriesData?.data));

      let parseOtherGraphs = JSON.parse(otherGraphs?.data);
      setCardsVal(parseOtherGraphs);
      setAttgraph(parseOtherGraphs?.data)
      setGniGraph(parseOtherGraphs?.giniData)
      
    } else {
      setShowSummary(false);
      setShowFilters(false);
    }
  };
  // console.log(timeSerious);
  let formattedArr = [];
  if (timeSerious.data) {
    formattedArr = timeSerious?.data.map((item) => {
      let formattedX = item.x.map((xValue) => {
        const year = xValue.slice(0, 4);
        const month = xValue.slice(4);
        const formattedMonth = month.length === 1 ? "0" + month : month;
        return formattedMonth + "-" + year;
      });

      return { ...item, x: formattedX };
    });
    // console.log(formattedArr);
  }
  const loadRes = () => {
    if (profileData.length) {
      filtersApi();
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sx={6} sm={12} md={12} lg={5.5}>
          <ProfileSection
            setProfileData={setProfileData}
            profileData={profileData}
            loadRes={loadRes}
          />
        </Grid>
        <Grid textAlign="center" item xs={12} sm={12} md={12} lg={6.5}>
          <Card
            // className="summary-card"
            sx={{
              boxShadow: "1px 1px 8px #80808085",
              height: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "25px",
                margin: "7px 0px",
              }}
            >
              Summary
            </p>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loader ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <CircularProgress />
                  <Typography sx={{ mt: "10px" }}>Loading</Typography>
                </Box>
              ) : showSummary ? (
                <SummaryCard
                  summaryData={summaryData}
                  profileData={profileData}
                />
              ) : (
                ""
              )}
            </div>
          </Card>
        </Grid>
      </Grid>
      {/* {loader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: "10px" }}>Loading</Typography>
        </Box>
      ) : showFilters ? (
        <FilterSection filterNames={filterNames} lookupApi={lookupApi} />
      ) : (
        ""
      )} */}
      {showFilters ? (
        <FilterSection filterNames={filterNames} lookupApi={lookupApi} />
      ) : (
        ""
      )}
      <Box sx={{ mt: "30px", boxShadow: "1px 1px 8px #80808085", p: "20px" }}>
        <Typography
          sx={{
            pr: "17px",
            pb: "17px",
            pl: "20px",
            fontSize: "20px",
          }}
        >
          {dataT.columns ? "Results" : "No results to show"}
        </Typography>
        {loader ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: "10px" }}>Loading</Typography>
          </Box>
        ) : (
          <div className="App">
            <Box sx={{ overflow: "auto" }}>
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <TableContainer sx={{ height: "500px" }} component={Paper}>
                  <ResultsTable
                    profileData={profileData}
                    setDataT={setDataT}
                    dataT={dataT}
                  />
                </TableContainer>
              </Box>
            </Box>
          </div>
        )}
      </Box>

      <Graph
        profileData={profileData}
        parseTimeseries={timeSerious}
        formattedArr={formattedArr}
        attgraph={attgraph}
        giniGraph={giniGraph}
        cardsVal={cardsVal}
      />
      
    </>
  );
}

export default Results;
