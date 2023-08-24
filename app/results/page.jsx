"use client";

import React, { useEffect, useRef, useState } from "react";
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
  getModalData,
  tableFilters,
  graphFilters,
} from "../setup/Services/SegmentationServices";

function Results() {
  const [profileData, setProfileData] = useState([]);
  const [dataT, setDataT] = useState({ columns: [], rows: [] });
  const [filterNames, setFilterNames] = useState([]);
  const [lookupApi, setLookupApi] = useState([]);
  const [xAxis, setABC] = useState(false);
  const [yAxis, setXYZ] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryFilt, setSummaryFilt] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [timeSerious, setTimeSerious] = useState(false);
  const [attgraph, setAttgraph] = useState(false);
  const [giniGraph, setGniGraph] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cardsVal, setCardsVal] = useState(false);
  const [modalVals, setModalVals] = useState(false);
  const [dropFilts, setDropFilts] = useState(false);
  const[attLoader,setAttLoader]= useState(false);
  // const [isPageReloading, setIsPageReloading] = useState(true);

  const [filterGraph, setFilterGraph] = useState({
    profile: "",
    arr: {},
  });
  // console.log(filterGraph);
  // const [dummy, setDummy] = useState({
  //   profile: "Abc Brand-Grammage Wise_1",
  //   arr: {
  //     Brand: "Bonus Regular",
  //     Grammage: "110-70 GM",
  //   },
  // });
  const getOthersGraph = async () => {
    // setAttLoader(true)
    const otherGraphs = await getOtherGraphs(filterGraph);
    let parseOtherGraphs = JSON.parse(otherGraphs?.data);
    setCardsVal(parseOtherGraphs);
    setGniGraph(parseOtherGraphs?.giniData);
    setAttgraph(parseOtherGraphs?.data);
    setAttLoader(false)
  };
  const getDropFilters = async () => {
    const getDropFiltersResponse = await graphFilters({ profile: profileData });
    let parseDropFilts = JSON.parse(getDropFiltersResponse?.data);
    setDropFilts(parseDropFilts);
  };


  
  const otherApis = async (isColumns) => {
    const filterRes = await getProfile({ mode: "all" });
    const summaryRes = await getSummary();
  
    const timeseriesData = await timeSeriesGraph({ profile: profileData });
    getDropFilters();
    let parseFilterData = JSON.parse(filterRes?.data);
    setFilterNames(Object.keys(parseFilterData));
    setLookupApi(parseFilterData);

    let parseSummary = JSON.parse(summaryRes?.data);
    setSummaryData(JSON.parse(parseSummary?.data));
    setABC(parseSummary?.ABC);
    setXYZ(parseSummary?.XYZ);
    setTimeSerious(JSON.parse(timeseriesData?.data));

    setShowSummary(true);
    setShowFilters(true);
    // console.log(dropFilts);

    setLoader(false);
    // setSummaryLoader(false)
  };

  const loadApis = async () => {
    setLoader(true);
    // setSummaryLoader(true)
    const tableRes = await resTable({ profile: profileData });
    let parseData = JSON.parse(tableRes?.data);
    setDataT({ columns: parseData?.columns, rows: parseData?.data });
    otherApis(parseData?.columns);
  };

  
  

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
      loadApis();
    }
  };
  // console.log(modalData);
  const getSummaryFiltVals = (data) => {
    setSummaryFilt(data);
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
                  {/* <Typography sx={{ mt: "10px" }}>Loading</Typography> */}
                </Box>
              ) : showSummary ? (
                <SummaryCard
                  summaryData={summaryData}
                  profileData={profileData}
                  modalVals={modalVals}
                  summaryFilt={summaryFilt}
                  xAxis={xAxis}
                  yAxis={yAxis}
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
        <FilterSection
          filterNames={filterNames}
          lookupApi={lookupApi}
          otherApis={otherApis}
          setDataT={setDataT}
          dataT={dataT}
          setLoader={setLoader}
          loader={loader}
          setSummaryData={setSummaryData}
          getSummaryFiltVals={getSummaryFiltVals}
          // loadTableFilts={LoadTableFilts}
          // filtVals={filtVals}
          // setfiltVals={setfiltVals}
        />
      ) : (
        ""
      )}
      <Box sx={{ mt: "30px", boxShadow: "1px 1px 8px #80808085", p: "20px" }}>
        <Typography
          sx={{
            pr: "17px",
            pb: "17px",
            pl: "20px",
            fontSize: "24px",
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
            {/* <Typography sx={{ mt: "10px" }}>Loading</Typography> */}
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
        dropFilts={dropFilts}
        setFilterGraph={setFilterGraph}
        filterGraph={filterGraph}
        getOthersGraph={getOthersGraph}
        getDropFilters={getDropFilters}
        attLoader={attLoader}
        setAttLoader={setAttLoader}
      />
    </>
  );
}

export default Results;
