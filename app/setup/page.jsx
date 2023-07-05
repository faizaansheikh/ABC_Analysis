'use client'

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BasicTable from '../components/BasicTable';
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
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "none",
//   // ...theme.typography.body2,
//   // padding: theme.spacing(1),
//   // textAlign: 'center',
//   // color: theme.palette.text.secondary,
// }));

function Setup() {
  const [age,setAge] = useState('')
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
  ];

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
              fullWidth
              size="small"
              label="a name to identify your settings profile"
            ></CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Measure (ABC)
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Select a segmentation measure"
              select
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            >
              {top100Films.map((elem)=>{
                return <MenuItem value={elem.year}>{elem.year}</MenuItem>
              })}
              {/* <MenuItem >1</MenuItem>
              <MenuItem>2</MenuItem>
              <MenuItem>3</MenuItem> */}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Primary Calculation Level
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Select your base level for calculations"
              select
              value={age}
              onChange={(e)=>setAge(e.target.value)}

            >
             {top100Films.map((elem)=>{
                return <MenuItem value={elem.year}>{elem.year}</MenuItem>
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Periodcity
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Period to base your calculations on"
              select
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            >
               {top100Films.map((elem)=>{
                return <MenuItem value={elem.year}>{elem.year}</MenuItem>
              })}
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Calculation Horizon
            </Typography>
            <CssTextField
              fullWidth
              size="small"
              label="Input your previous Weeks/Months/Year as a number"
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
              fullWidth
              size="small"
              label="Select Further levels for grouping"
              select
            >
              <MenuItem>n</MenuItem>
              <MenuItem>n</MenuItem>
              <MenuItem>n</MenuItem>
            </CssTextField>

            <Typography sx={{ mr: "20px", mt: "20px", mb: "20px" }}>
              Segmentation Method
            </Typography>
            <Autocomplete
              fullWidth
              size="small"
              id="combo-box-demo"
              options={top100Films}
              // sx={{ width: 300 }}
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
            fullWidth
            // sx={{width:{xs:'280px',md:'fullwidth'}}}
            size="small"
            label="Select a measure for XYZ"
            select
          >
            <MenuItem>n</MenuItem>
            <MenuItem>n</MenuItem>
            <MenuItem>n</MenuItem>
          </CssTextField>
        </Box>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 3 }}
          justify='center'
          width='auto'
          sx={{ mt: '33px' }}
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
                fullWidth
                size="small"
                type="number"
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
                fullWidth
                size="small"
                type="number"
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
                fullWidth
                size="small"
                type="number"
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
          >
            Save
          </ColorButton>
        </Box>
      </Box>
    </>
  );
}

export default Setup;