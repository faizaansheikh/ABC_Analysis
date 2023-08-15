"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ResultsTable from "../components/ResultsTable";
import SummaryCard from "../components/SummaryCard";
import ProfileSection from "../components/ProfileSection";
import FilterSection from "../components/FilterSection";
import Graph from "../components/Graph/Graph";

function Results() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sx={6} sm={12} md={12} lg={5.5}>
          <ProfileSection />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6.5}>
          <SummaryCard />
        </Grid>
      </Grid>

      <FilterSection />

      <Box sx={{ mt: "30px", boxShadow: "1px 1px 8px #80808085", p: "20px" }}>
        <Typography
          sx={{
            pr: "17px",
            pb: "17px",
            pl: "20px",
            fontSize: "20px",
          }}
        >
          Results
        </Typography>
        <ResultsTable />
      </Box>

      <Graph />
    </>
  );
}

export default Results;
