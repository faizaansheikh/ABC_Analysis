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
import { toast } from 'react-toastify';

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
    Use_grouping: 0,
    grouping_Attributes: [],
    type: "BOTH",
    Segmentation_method: "Pareto by percentage",
    SegmentationMeasureXYZ: "",
    x: 0,
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
        Use_grouping: 1,
      });
    } else {
      setGroupTrue(false);
      setInputVals({
        ...inputVals,
        Use_grouping: 0,
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
  const handleGrouping = (e, values) => {
    setInputVals({
      ...inputVals,
      grouping_Attributes: values,
    });
  };

  const handleSave = () => {
    if (inputVals.profile_name === "") {
      setValidation({
        ...validation,
        pname: true,
      });
    } else if (!inputVals.Segmentation_Measure) {
      setValidation({
        ...validation,
        segMeas: true,
      });
    } else if (!inputVals.Caluclation_level) {
      setValidation({
        ...validation,
        calLevel: true,
      });
    } else if (!inputVals.Periodicity) {
      setValidation({
        ...validation,
        period: true,
      });
    } else if (!inputVals.Calculation_Horizon) {
      setValidation({
        ...validation,
        calHoriz: true,
      });
    } else if (
      inputVals.grouping_Attributes.length === 0 &&
      grouping
    ) {
      setValidation({
        ...validation,
        groupAtt: true,
      });
    } else if (!inputVals.Segmentation_method) {
      setValidation({
        ...validation,
        segMethd: true,
      });
    } else if (!inputVals.SegmentationMeasureXYZ && !abcGroup) {
      setValidation({
        ...validation,
        segMesureXyz: true,
      });
    } else if (inputVals.x == 0) {
      setValidation({
        ...validation,
        valX: true,
      });
    } else if (inputVals.Gini == 0) {
      setValidation({
        ...validation,
        valGini: true,
      });
    } else if (inputVals.slope == 0) {
      setValidation({
        ...validation,
        valSlope: true,
      });
    } else {
      console.log(inputVals);
      toast.success('values save successfully', {
        autoClose: 3000,
        theme: "dark",
      })
      // console.log(inputVals);
    };
    useEffect(() => {
      if (inputVals.profile_name !== "") {
        setValidation({
          ...validation,
          pname: false,
        });
      }

    }, [inputVals.profile_name])

    useEffect(() => {

      if (
        inputVals.grouping_Attributes.length > 0
      ) {
        setValidation({
          ...validation,
          groupAtt: false,
        });
      }
      //   if (inputVals.Segmentation_method !== '') {
      //   setValidation({
      //     ...validation,
      //     segMethd: false,
      //   });
      // }
    }, [inputVals.grouping_Attributes])

    useEffect(() => {

      if (inputVals.Segmentation_Measure) {
        setValidation({
          ...validation,
          segMeas: false,
        });
      }
      if (inputVals.Caluclation_level) {
        setValidation({
          ...validation,
          calLevel: false,
        });
      }
      if (inputVals.Periodicity) {
        setValidation({
          ...validation,
          period: false,
        });
      }
      if (inputVals.Calculation_Horizon) {
        setValidation({
          ...validation,
          calHoriz: false,
        });
      }

      if (inputVals.SegmentationMeasureXYZ) {
        setValidation({
          ...validation,
          segMesureXyz: false,
        });
      }
      if (inputVals.x.length > 0) {
        setValidation({
          ...validation,
          valX: false,
        });
      }
      if (inputVals.Gini > 0) {
        setValidation({
          ...validation,
          valGini: false,
        });
      }
      if (inputVals.slope > 0) {
        setValidation({
          ...validation,
          valSlope: false,
        });
      }
    }, [
      inputVals.Segmentation_Measure,
      inputVals.Caluclation_level,
      inputVals.Periodicity,
      inputVals.Calculation_Horizon,
      inputVals.SegmentationMeasureXYZ,
      inputVals.x,
      inputVals.Gini,
      inputVals.slope
    ])

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
                onChange={handleChange}
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
                label="Select Further levels for grouping"
                select
                value={inputVals.grouping_Attributes}
                onChange={handleChange}
              />
              <CssTextField>
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
                  name="x"
                  fullWidth
                  size="small"
                  type="number"
                  value={inputVals.x}
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
                  name="Gini"
                  fullWidth
                  size="small"
                  type="number"
                  value={inputVals.Gini}
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
                  name="slope"
                  fullWidth
                  size="small"
                  type="number"
                  value={inputVals.slope}
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
}

export default Setup;