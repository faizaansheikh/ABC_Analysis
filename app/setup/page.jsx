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
  postSegmentaion
} from "./Services/SegmentationServices";
import { toast } from "react-toastify";
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
  const [inputVals, setInputVals] = useState({
    profile_name: "",
    Segmentation_Measure: "",
    Caluclation_level: "",
    Periodicity: "",
    Calculation_Horizon: '',
    Use_grouping: '0',
    grouping_Attributes: [],
    Type: "BOTH",
    Segmentation_method: "Pareto by percentage",
    SegmentationMeasureXYZ: "",
    X: 0,
    Gini: 0,
    slope: 0,
    A: 0,
    B: 0,
    C: 0
  });

  const [validation, setValidation] = useState({
    pname: false,
    pNameLength: false,
    segMeas: false,
    calLevel: false,
    period: false,
    calHoriz: false,
    groupAtt: false,
    segMethd: false,
    segMesureXyz: false,
    valX: false,
    valGini: false,
    valSlope: false,
  });
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
  const [totalValue, setTotalValue] = useState(0);

  const handleGroups = (e) => {
    setGrouping(e.target.checked);
    if (e.target.checked) {
      setGroupTrue(true);
      setInputVals({
        ...inputVals,
        Use_grouping: '1',
      });
    } else {
      setGroupTrue(false);
      setInputVals({
        ...inputVals,
        Use_grouping: '0',
      });
      setInputVals({
        ...inputVals,
        grouping_Attributes: []
      })
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
      setInputVals({
        ...inputVals,
        SegmentationMeasureXYZ: ''
      })
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
  const handleNumbersChange = (e) => {
    const { name, value } = e.target
    setInputVals({
      ...inputVals,
      [name]: parseFloat(value),
    });
  }
  const handleGrouping = (e, values) => {
    setInputVals({
      ...inputVals,
      grouping_Attributes: values,
    });
  };
  const toastError = () => {
    toast('Please fill all fields', {
      type: 'error',
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  const handleSave = async () => {
    console.log(totalValue);
    if (inputVals.profile_name === "") {
      setValidation({
        ...validation,
        pname: true,
      });
      toastError()
    } else if (!inputVals.Segmentation_Measure) {
      setValidation({
        ...validation,
        segMeas: true,
      });
      toastError()
    } else if (!inputVals.Caluclation_level) {
      setValidation({
        ...validation,
        calLevel: true,
      });
      toastError()
    } else if (!inputVals.Periodicity) {
      setValidation({
        ...validation,
        period: true,
      });
      toastError()
    } else if (!inputVals.Calculation_Horizon) {
      setValidation({
        ...validation,
        calHoriz: true,
      });
      toastError()
    } else if (
      inputVals.grouping_Attributes.length === 0 &&
      grouping
    ) {
      setValidation({
        ...validation,
        groupAtt: true,
      });
      toastError()
    } else if (!inputVals.Segmentation_method) {
      setValidation({
        ...validation,
        segMethd: true,
      });
      toastError()
    } else if (totalValue > 100 || totalValue < 100) {
      toast('All inputs add upto 100', {
        type: 'error',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else if (!inputVals.SegmentationMeasureXYZ && !abcGroup) {
      setValidation({
        ...validation,
        segMesureXyz: true,
      });
      toastError()
    } else if (!inputVals.X) {
      setValidation({
        ...validation,
        valX: true,
      });
      toastError()
    } else if (!inputVals.Gini) {
      setValidation({
        ...validation,
        valGini: true,
      });
      toastError()
    } else if (!inputVals.slope) {
      setValidation({
        ...validation,
        valSlope: true,
      });
      toastError()
    } else {
      console.log(inputVals);
      // const res = await postSegmentaion(inputVals)
      // console.log(res)
      toast.success('Values save successfully', {
        autoClose: 3000,
        theme: "dark",

      })

      // setInputVals({
      //   profile_name: "",
      //   Segmentation_Measure: "",
      //   Caluclation_level: "",
      //   Periodicity: "",
      //   Calculation_Horizon: '',
      //   Use_grouping: 0,
      //   grouping_Attributes: [],
      //   type: "BOTH",
      //   Segmentation_method: "Pareto by percentage",
      //   SegmentationMeasureXYZ: "",
      //   x: 0,
      //   Gini: 0,
      //   slope: 0,
      // })

    }
  };



  useEffect(() => {
    if (inputVals.profile_name !== "") {
      setValidation((prevState) => ({
        ...prevState,
        pname: false,
      }));
    }
    if (inputVals.Segmentation_Measure) {
      setValidation((prevState) => ({
        ...prevState,
        segMeas: false,
      }));
    }
    if (inputVals.Caluclation_level) {
      setValidation((prevState) => ({
        ...prevState,
        calLevel: false,
      }));
    }
    if (inputVals.Periodicity && inputVals.Periodicity !== "") {
      setValidation((prevState) => ({
        ...prevState,
        period: false,
      }));
    }
    if (inputVals.Calculation_Horizon) {
      setValidation((prevState) => ({
        ...prevState,
        calHoriz: false,
      }));
    }
    if (
      inputVals.grouping_Attributes.length > 0
    ) {
      setValidation((prevState) => ({
        ...prevState,
        groupAtt: false,
      }));
    }
    if (inputVals.SegmentationMeasureXYZ) {
      setValidation((prevState) => ({
        ...prevState,
        segMesureXyz: false,
      }));
    }
    if (inputVals.X > 0) {
      setValidation((prevState) => ({
        ...prevState,
        valX: false,
      }));
    }
    if (inputVals.Gini > 0) {
      setValidation((prevState) => ({
        ...prevState,
        valGini: false,
      }));
    }
    if (inputVals.slope > 0) {
      setValidation((prevState) => ({
        ...prevState,
        valSlope: false,
      }));
    }
  }, [
    inputVals.profile_name,
    inputVals.Segmentation_Measure,
    inputVals.Caluclation_level,
    inputVals.Periodicity,
    inputVals.Calculation_Horizon,
    inputVals.grouping_Attributes,
    inputVals.SegmentationMeasureXYZ,
    inputVals.X,
    inputVals.Gini,
    inputVals.slope
  ]);

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
              value={inputVals.profile_name}
              onChange={handleChange}
              error={validation.pname}
              helperText={validation.pname && "Profile name is required"}

            ></CssTextField>

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
              error={validation.segMeas}
              helperText={validation.segMeas && "Please select a value"}
            >
              {segMeasure.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

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
              error={validation.calLevel}
              helperText={
                validation.calLevel && "Please select caluclation level"
              }
            >
              {primaryCalculation.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

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
              error={validation.period}
              helperText={validation.period && "Please select Periodicity"}
            >
              {periodicity.map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Calculation Horizon
            </Typography>
            <CssTextField
              name="Calculation_Horizon"
              type="number"
              fullWidth
              size="small"
              label="Input your previous Weeks/Months/Year as a number"
              value={inputVals.Calculation_Horizon}
              onChange={handleNumbersChange}
              error={validation.calHoriz}
              helperText={
                validation.calHoriz && "Please select calculation horizon"
              }
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
              <Switch checked={grouping} onChange={handleGroups} />
            </Box>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Secondary Calculation Levels
            </Typography>
            <Autocomplete
              multiple
              disabled={!groupTrue}
              name="Segmentation_method"
              fullWidth
              size="small"
              id="combo-box-demo"
              options={secondaryCalculation}
              value={inputVals.grouping_Attributes}
              // sx={{ width: 300 }}
              onChange={handleGrouping}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  label="Select secondary calculation levels"
                  error={validation.groupAtt}
                  helperText={
                    validation.groupAtt &&
                    "Please select secondary calculation level"
                  }
                />
              )}
            />

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
              onSelect={handleChange}
              value={inputVals.Segmentation_method}
              renderInput={(params) => (
                <CssTextField
                  name="Segmentation_method"
                  value={inputVals.Segmentation_method}
                  {...params}
                  label="pareto by percentage"
                  onSelect={handleChange}
                  error={validation.segMethd}
                  helperText={
                    validation.segMethd && "Please select segmentation method"
                  }
                />
              )}
            />
          </FormControl>
        </Box>

        <Box sx={{ width: "100%" }}>
          <BasicTable inputVals={inputVals} setInputVals={setInputVals} setTotalValue={setTotalValue} />
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
            disabled={!abcGroupTrue}
            name="SegmentationMeasureXYZ"
            fullWidth
            // sx={{width:{xs:'280px',md:'fullwidth'}}}
            size="small"
            label="Select a measure for XYZ"
            select
            value={inputVals.SegmentationMeasureXYZ}
            onChange={handleChange}
            error={validation.segMesureXyz}
            helperText={
              validation.segMesureXyz && "Please select xyz segmentation method"
            }
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
                name="X"
                fullWidth
                size="small"
                type="number"
                value={inputVals.X}
                onChange={handleNumbersChange}
                error={validation.valX}
                helperText={validation.valX && "Please fill this field"}
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
                name="Gini"
                fullWidth
                size="small"
                type="number"
                value={inputVals.Gini}
                onChange={handleNumbersChange}
                error={validation.valGini}
                helperText={validation.valGini && "Please fill this field"}
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
                name="slope"
                fullWidth
                size="small"
                type="number"
                value={inputVals.slope}
                onChange={handleNumbersChange}
                error={validation.valSlope}
                helperText={validation.valSlope && "Please fill this field"}
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