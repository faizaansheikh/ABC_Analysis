"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BasicTable from "../components/BasicTable";
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ColorButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#398585",
  "&:hover": {
    backgroundColor: "#398585",
  },
}));
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#398585",
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

function Setup() {
  const segMeasure = [
    "Segmentation measure ABC 1",
    "Segmentation measure ABC 2",
    "Segmentation measure ABC 3",
    "Segmentation measure ABC 4",
    "Segmentation measure ABC 5",
  ];
  const segMethod = [
    "Segmentation method 1",
    "Segmentation method 2",
    "Segmentation method 3",
    "Segmentation method 4",
    "Segmentation method 5",
  ];
  const xyzMethod = [
    "XYZ Segmentation Method 1",
    "XYZ Segmentation Method 2",
    "XYZ Segmentation Method 3",
    "XYZ Segmentation Method 4",
    "XYZ Segmentation Method 5",
  ];
  const primaryCalculation = [
    "Primary Calculation 1",
    "Primary Calculation 2",
    "Primary Calculation 3",
    "Primary Calculation 4",
    "Primary Calculation 5",
  ];
  const secondaryCalculation = [
    "Secondary Calculation 1",
    "Secondary Calculation 2",
    "Secondary Calculation 3",
    "Secondary Calculation 4",
    "Secondary Calculation 5",
  ];
  const period = [
    "Periodicity 1",
    "Periodicity 2",
    "Periodicity 3",
    "Periodicity 4",
    "Periodicity 5",
  ];
  const [age, setAge] = useState("");
  const [inputVals, setInputVals] = useState({
    profileName: "",
    segmentationMeasure: "",
    primaryCal: "",
    periodcity: "",
    horizon: null,
    grouping: false,
    secondaryCal: "",
    abcSegmentation: false,
    xyzSegMethod: "",
    cvThreshold: null,
    giniThreshold: null,
    slopeThreshold: null,
  });
  const handleChange = (e) => {
    setInputVals({
      ...inputVals,
      [e.target.name]: e.target.value
    })
  }
  const handleSave = () => {
    console.log(inputVals);
  }
  return (
    <>
      <Box
        sx={
          {
            // pl: { xs: "0px", md: "20px", lg: "20px" },
            // pr: { xs: "0px", md: "20px", lg: "20px" },
          }
        }
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 3 }}
          // sx={{ mr: { xs: "0px", md: "none", lg: "none" } }}
          align="center"
          justify="center"
          width="auto"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "whitesmoke",
                textAlign: "center",
                p: "15px",
                width: { xs: "100%", lg: "auto" },
              }}
            >
              ABC Setup
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "whitesmoke",
                textAlign: "center",
                p: "15px",
                width: { xs: "100%", lg: "auto" },
              }}
            >
              XYZ Setup
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            width: { xs: "100%", lg: 460, xl: 600 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // mr: { xs: "0px", md: "none", lg: "none" },
          }}
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <Typography sx={{ mt: "20px", mb: "20px" }}>
              Profile Name
            </Typography>
            <CssTextField
              name="profileName"
              fullWidth
              size="small"
              label="a name to identify your settings profile"
              value={inputVals.profileName}
              onChange={handleChange}
            ></CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Measure (ABC)
            </Typography>
            <CssTextField
              name="segmentationMeasure"
              fullWidth
              size="small"
              label="Select a segmentation measure"
              select
              value={inputVals.segmentationMeasure}

              onChange={handleChange}
            >
              {segMeasure.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Primary Calculation Level
            </Typography>
            <CssTextField
              name="primaryCal"
              fullWidth
              size="small"
              label="Select your base level for calculations"
              select
              value={inputVals.primaryCal}
              onChange={handleChange}
            >
              {primaryCalculation.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Periodcity
            </Typography>
            <CssTextField
              name="periodcity"
              fullWidth
              size="small"
              label="Period to base your calculations on"
              select
              value={inputVals.periodcity}
              onChange={handleChange}
            >
              {period.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Calculation Horizon
            </Typography>
            <CssTextField
              name="horizon"
              type="number"
              fullWidth
              size="small"
              label="Input your previous Weeks/Months/Year as a number"
              value={inputVals.horizon}
              onChange={handleChange}
            ></CssTextField>
            <Box
              sx={{
                mt: "30px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
                Use Grouping
              </Typography>
              <Switch defaultChecked />
            </Box>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Secondary Calculation Levels
            </Typography>
            <CssTextField
              name="secondaryCal"
              fullWidth
              size="small"
              label="Select Further levels for grouping"
              select
              value={inputVals.secondaryCal}
              onChange={handleChange}
            >
              {secondaryCalculation.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Method
            </Typography>
            <Autocomplete
              name="Segmentation Method"
              fullWidth
              size="small"
              id="combo-box-demo"
              options={segMethod}
              // sx={{ width: 300 }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              renderInput={(params) => (
                <CssTextField {...params} label="pareto by percentage" />
              )}
            />
          </FormControl>
        </Box>

        <Box sx={{ width: "100%" }}>
          <BasicTable />
        </Box>

        <Box
          sx={{
            mt: "30px",
          }}
        >
          <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
            Run Only ABC Segmentation
            <Switch defaultChecked />
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", lg: 460, xl: 600 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            // mr: { xs: "3px", md: "none", lg: "none" },
          }}
        >
          <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
            XYZ Segmentation Method
          </Typography>
          <CssTextField
            name="xyzSegMethod"
            fullWidth
            // sx={{width:{xs:'280px',md:'fullwidth'}}}
            size="small"
            label="Select a measure for XYZ"
            select
            value={inputVals.xyzSegMethod}
            onChange={handleChange}
          >
            {xyzMethod.map((elem) => {
              return <MenuItem value={elem}>{elem}</MenuItem>;
            })}
          </CssTextField>
        </Box>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 3 }}
          justify="center"
          width="auto"
          sx={{ mt: "33px" }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: { xs: "100%", lg: "auto" },
              }}
            >
              <Typography sx={{ mt: "10px", mb: "10px" }}>
                Cv Threshold
              </Typography>
              <CssTextField
                name="cvThreshold"
                fullWidth
                size="small"
                type="number"
                value={inputVals.cvThreshold}
                onChange={handleChange}
              // label=""
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: { xs: "100%", lg: "auto" },
              }}
            >
              <Typography sx={{ mt: "10px", mb: "10px" }}>
                Gini Threshold
              </Typography>
              <CssTextField
                name="giniThreshold"
                fullWidth
                size="small"
                type="number"
                value={inputVals.giniThreshold}
                onChange={handleChange}
              // label=""
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: { xs: "100%", lg: "auto" },
              }}
            >
              <Typography sx={{ mt: "10px", mb: "10px" }}>
                Slope Threshold
              </Typography>
              <CssTextField
                name="slopeThreshold"
                fullWidth
                size="small"
                type="number"
                value={inputVals.slopeThreshold}
                onChange={handleChange}
              // label=""
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "start",
              lg: "start",
            },
          }}
        >
          <ColorButton sx={{ bgcolor: "#398585", color: "white", mt: "30px" }} onClick={handleSave}>
            Save
          </ColorButton>
        </Box>
      </Box>
    </>
  );
}

export default Setup;