"use client";

import React, { useState, useEffect } from "react";
import { Autocomplete, Card, Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import ViewDialog from "./ViewDialog";
import { getProfile } from "../setup/Services/SegmentationServices";

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

const ProfileSection = ({ profileData, setProfileData, loadRes }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  const viewDialogHandler = () => {
    setOpen(true);
  };

  const refreshButton = () => {
    setProfileData('')
    window.location.reload()
  }

  const fetchProfile = async () => {
    const res = await getProfile({ mode: "profiles" });
    setProfile(res?.data?.map((e) => e));
  };
  useEffect(() => {
    fetchProfile();
  }, []);


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
          options={profile || ['No options']}
          value={profileData} // Set the selected value
          onChange={(event, newValue) => setProfileData(newValue)} // Update profileData on change
          renderInput={(params, option) => (
            <CssTextField value={profileData} {...params} />
          )}
        />
        <Box
          sx={{
            margin: "20px 0px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <ColorButton variant="contained" onClick={loadRes}>Load Results</ColorButton>
          <ColorButton variant="contained" onClick={refreshButton}>Refresh</ColorButton>
          <ColorButton variant="contained" onClick={viewDialogHandler}
           disabled={!profileData || profileData?.length === 0}
           >
            View Params
          </ColorButton>
        </Box>
      </Card>
      {open ? (
        <ViewDialog

          profileData={profileData}
          setOpen={setOpen}
          open={open}
        />
      ) : null}
    </>
  );
};

export default ProfileSection;