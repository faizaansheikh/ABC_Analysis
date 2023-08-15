'use client'

import styled from "@emotion/styled";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import React from "react";

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
];

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

const FilterSection = () => {
    return (
        <Grid
            container
            gap={2}
            sx={{
                display: "flex",
                textAlign: "center",
                marginTop: "50px",
                justifyContent: "center",
            }}
        >
            <Grid item xs={12} sm={8} md={4} lg={3.5}>
                <Card
                    sx={{
                        boxShadow: "1px 1px 8px #80808085",
                        padding: "7px 20px 20px",
                        backgroundColor: "#71807a",
                        color: "white",
                    }}
                >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}>
                        ABC Filter
                    </p>
                    <Autocomplete
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                        }}
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4} lg={3.5}>
                <Card
                    sx={{
                        boxShadow: "1px 1px 8px #80808085",
                        padding: "7px 20px 20px",
                        backgroundColor: "#71807a",
                        color: "white",
                    }}
                >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}>
                        XYZ Filter
                    </p>
                    <Autocomplete
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                        }}
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4} lg={3.5}>
                <Card
                    sx={{
                        boxShadow: "1px 1px 8px #80808085",
                        padding: "7px 20px 20px",
                        backgroundColor: "#71807a",
                        color: "white",
                    }}
                >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}>
                        Measure
                    </p>
                    <Autocomplete
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                        }}
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4} lg={3.9}>
                <Card
                    sx={{
                        boxShadow: "1px 1px 8px #80808085",
                        padding: "7px 20px 20px",
                        backgroundColor: "#71807a",
                        color: "white",
                    }}
                >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}>
                        Brand
                    </p>
                    <Autocomplete
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                        }}
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4} lg={3.9}>
                <Card
                    sx={{
                        boxShadow: "1px 1px 8px #80808085",
                        padding: "7px 20px 20px",
                        backgroundColor: "#71807a",
                        color: "white",
                    }}
                >
                    <p style={{ textAlign: "center", fontSize: "20px", margin: "0px" }}>
                        Grammage
                    </p>
                    <Autocomplete
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                        }}
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

export default FilterSection;