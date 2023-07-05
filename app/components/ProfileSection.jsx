'use client'

import React, { useState } from "react";
import { Autocomplete, Card, Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import ViewDialog from "./ViewDialog";

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
];

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

    const viewDialogHandler = () => {
        setOpen(true);
    };

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
                    options={top100Films}
                    renderInput={(params) => <CssTextField {...params} />}
                />
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
            {open ? <ViewDialog setOpen={setOpen} open={open} /> : null}
        </>
    );
};

export default ProfileSection;