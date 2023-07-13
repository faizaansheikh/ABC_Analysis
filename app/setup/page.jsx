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
import { useEffect, useState } from "react";
import {
  getPeriodicity,
  getPrimaryCalApi,
  getSecondaryCalculationLevel,
  getSegMeasureApi,
  getSegMeasureXYZ,
  getSegMethod,
} from "./Services/SegmentationServices";
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
  // const segMeasure = [
  //   "Segmentation measure ABC 1",
  //   "Segmentation measure ABC 2",
  //   "Segmentation measure ABC 3",
  //   "Segmentation measure ABC 4",
  //   "Segmentation measure ABC 5",
  // ];
  // const segMethod = [
  //   "Segmentation method 1",
  //   "Segmentation method 2",
  //   "Segmentation method 3",
  //   "Segmentation method 4",
  //   "Segmentation method 5",
  // ];
  // const xyzMethod = [
  //   "XYZ Segmentation Method 1",
  //   "XYZ Segmentation Method 2",
  //   "XYZ Segmentation Method 3",
  //   "XYZ Segmentation Method 4",
  //   "XYZ Segmentation Method 5",
  // ];
  // const primaryCalculation = [
  //   "Primary Calculation 1",
  //   "Primary Calculation 2",
  //   "Primary Calculation 3",
  //   "Primary Calculation 4",
  //   "Primary Calculation 5",
  // ];
  // const secondaryCalculation = [
  //   "Secondary Calculation 1",
  //   "Secondary Calculation 2",
  //   "Secondary Calculation 3",
  //   "Secondary Calculation 4",
  //   "Secondary Calculation 5",
  // ];
  // const periodicity = [
  //   "Periodicity 1",
  //   "Periodicity 2",
  //   "Periodicity 3",
  //   "Periodicity 4",
  //   "Periodicity 5",
  // ];
  const [inputVals, setInputVals] = useState({
    profile_name: "",
    Segmentation_Measure: "",
    Caluclation_level: "",
    Periodicity: "",
    Calculation_Horizon: null,
    Use_grouping: 0,
    grouping_Attributes: "",
    type: "BOTH",
    Segmentation_method: "",
    SegmentationMeasureXYZ: "",
    x: 0,
    Gini: 0,
    slope: 0,
    A: 0,
    B: 0,
    C: 0
  });
  const [validation, setValidation] = useState({});
  const [grouping, setGrouping] = useState(false);
  const [groupTrue, setGroupTrue] = useState(false);
  const [abcGroup, setAbcGroup] = useState(false);
  const [abcGroupTrue, setAbcGroupTrue] = useState(true);
  const [segMeasure, setSegMeasure] = useState([]);
  const [primaryCalculation, setPrimaryCalculation] = useState([]);
  const [periodicity, setPeriodicity] = useState([]);
  const [secondaryCalculation, setSecondaryCalculation] = useState([]);
  const [segMethod, setSegMethod] = useState([]);
  const [xyzMethod, setXyzMethod] = useState([]);
  const handleGroups = (e) => {
    setGrouping(e.target.checked);
    if (e.target.checked) {
      setGroupTrue(true);
      setInputVals({
        ...inputVals,
        Use_grouping: 1,
      });
    } else {
      setGroupTrue(false);
      setInputVals({
        ...inputVals,
        Use_grouping: 0,
      });
    }
  };
  const handleAbcGroup = (e) => {
    setAbcGroup(e.target.checked);
    if (e.target.checked) {
      setAbcGroupTrue(false);
      setInputVals({
        ...inputVals,
        type: "ABC",
      });
    } else {
      setAbcGroupTrue(true);
      setInputVals({
        ...inputVals,
        type: "BOTH",
      });
    }
  };
  const handleChange = (e) => {
    setInputVals({
      ...inputVals,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    if (inputVals.A <= 100) {
      return console.log('there is an error')
    } else {
      return console.log(inputVals);
    }


  };

  const getSegMeasure = async () => {
    const res = await getSegMeasureApi();
    setSegMeasure(res.data.values);
  };
  const getPrimaryCalculationLevel = async () => {
    const res = await getPrimaryCalApi();
    setPrimaryCalculation(res.data.values);
  };
  const fetchPeriodicity = async () => {
    const res = await getPeriodicity();
    setPeriodicity(res.data.values);
  };
  const fetchSecondaryCalculationLevel = async () => {
    const res = await getSecondaryCalculationLevel(inputVals.Caluclation_level);
    setSecondaryCalculation(res.data.values);
  };
  const fetchSegMethod = async () => {
    const res = await getSegMethod();
    setSegMethod(res.data.values);
  };
  const fetchSegMeasureXYZ = async () => {
    const res = await getSegMeasureXYZ();
    setXyzMethod(res.data.values);
  };

  useEffect(() => {
    getSegMeasure();
    getPrimaryCalculationLevel();
    fetchPeriodicity();
    fetchSecondaryCalculationLevel();
    fetchSegMethod();
    fetchSegMeasureXYZ();
  }, []);
  useEffect(() => {
    fetchSecondaryCalculationLevel();
  }, [inputVals.Caluclation_level]);
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
              name="profile_name"
              fullWidth
              size="small"
              label="a name to identify your settings profile"
            ></CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please fill this field**
            </Typography>
            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Measure (ABC)
            </Typography>
            <CssTextField
              name="Segmentation_Measure"
              fullWidth
              size="small"
              label="Select a segmentation measure"
              select
              value={inputVals.Segmentation_Measure}
              onChange={handleChange}
            >
              {segMeasure.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select segmentation measure**
            </Typography>
            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Primary Calculation Level
            </Typography>
            <CssTextField
              name="Caluclation_level"
              fullWidth
              size="small"
              label="Select your base level for calculations"
              select
              value={inputVals.Caluclation_level}
              onChange={handleChange}
            >
              {primaryCalculation.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select primary calculation level**
            </Typography>
            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Periodcity
            </Typography>
            <CssTextField
              name="Periodicity"
              fullWidth
              size="small"
              label="Period to base your calculations on"
              select
              value={inputVals.Periodicity}
              onChange={handleChange}
            >
              {periodicity.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select periodcity**
            </Typography>
            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Calculation Horizon
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Input your previous Weeks/Months/Year as a number"
            ></CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select calculation horizon**
            </Typography>
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
              <Switch checked={grouping} onChange={handleGroups} />
            </Box>

            {/* <Autocomplete
        multiple
        id="tags-standard"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      /> */}
            {/* <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Secondary Calculation Levels
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Select Further levels for grouping"
              select
            >
              {secondaryCalculation.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select secondary calculation level**
            </Typography>
            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Method
            </Typography>
            <Autocomplete
              name="Segmentation_method"
              fullWidth
              size="small"
              id="combo-box-demo"
              options={segMethod}
              // sx={{ width: 300 }}

              renderInput={(params) => (
                <CssTextField
                  name="Segmentation_method"
                  value={inputVals.Segmentation_method}
                  {...params}
                  label="pareto by percentage"
                  onSelect={handleChange}
                />
              )}
            />
            <Typography sx={{ mt: "10px", color: "red" }}>
              **Please select segmentation method**
            </Typography>
          </FormControl>
        </Box>

        <Box sx={{ width: "100%" }}>
          <BasicTable inputVals={inputVals} setInputVals={setInputVals} />
        </Box>

        <Box
          sx={{
            mt: "30px",
          }}
        >
          <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
            Run Only ABC Segmentation
            <Switch checked={abcGroup} onChange={handleAbcGroup} />
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
            fullWidth
            // sx={{width:{xs:'280px',md:'fullwidth'}}}
            size="small"
            label="Select a measure for XYZ"
            select
          >
            {xyzMethod.map((elem) => {
              return <MenuItem value={elem}>{elem}</MenuItem>;
            })}
          </CssTextField>
          <Typography sx={{ mt: "10px", color: "red" }}>
            **Please select xyz segmentation method**
          </Typography>
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
                name="x"
                fullWidth
                size="small"
                type="number"
              // label=""
              />
              <Typography sx={{ mt: "10px", color: "red" }}>
                **Please fill this field**
              </Typography>
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
                name="Gini"
                fullWidth
                size="small"
                type="number"
              // label=""
              />
              <Typography sx={{ mt: "10px", color: "red" }}>
                **Please fill this field**
              </Typography>
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
                name="slope"
                fullWidth
                size="small"
                type="number"
              // label=""
              />
              <Typography sx={{ mt: "10px", color: "red" }}>
                **Please fill this field**
              </Typography>
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
          <ColorButton
            sx={{ bgcolor: "#398585", color: "white", mt: "30px" }}
            onClick={handleSave}
          >
            Save
          </ColorButton>
        </Box>
      </Box>
    </>
  );
}

export default Setup;
