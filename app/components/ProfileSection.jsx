"use client";

import React, { useState } from "react";
import { Autocomplete, Card, Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import ViewDialog from "./ViewDialog";
import { getProfile } from "../setup/Services/SegmentationServices";
import { useEffect } from "react";

const ColorButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#398585",
  "&:hover": {
    backgroundColor: "#398585",
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
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

const ProfileSection = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState("");

  const viewDialogHandler = () => {
    setOpen(true);
  };

  const fetchProfile = async () => {
    const res = await getProfile({ mode: "profiles" });
    // console.log(res);
    setProfile(res?.data.map((e) => ({ label: e, value: e })));
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  // console.log(profile);
  return (
    <>
      <Card sx={{ boxShadow: "1px 1px 8px #80808085", padding: "0px 30px" }}>
        <p style={{ textAlign: "center", fontSize: "25px", margin: "7px 0px" }}>
          Profile Selection
        </p>
        <Autocomplete
          fullWidth
          size="small"
          disablePortal
          id="combo-box-demo"
          options={profile}
          value={profileData} // Set the selected value
          onChange={(event, newValue) => setProfileData(newValue.label)} // Update profileData on change
          renderInput={(params) => (
            <CssTextField value={profileData} {...params} />
          )}
        />
        {/* {profileData} */}
        <Box
          sx={{
            margin: "20px 0px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <ColorButton variant="contained">Load Results</ColorButton>
          <ColorButton variant="contained">Refresh</ColorButton>
          <ColorButton variant="contained" onClick={viewDialogHandler}>
            View Params
          </ColorButton>
        </Box>
      </Card>
      {open ? <ViewDialog profileData={profileData} setOpen={setOpen} open={open} /> : null}
    </>
  );
};

export default ProfileSection;
