"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { resTable } from "../setup/Services/SegmentationServices";
import { useState } from "react";
import { Suspense } from "react";
import { DataGrid } from "@mui/x-data-grid";
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
const headerData = [
  "ABC",
  "XYZ",
  "Brand",
  "Grammage",
  "Measure",
  "2019 M11",
  "2019 M12",
  "2020 M01",
  "2020 M02",
  "ABC",
  "XYZ",
  "Brand",
  "Grammage",
  "Measure",
  "2019 M11",
  "2019 M12",
  "2020 M01",
  "2020 M02",
  "ABC",
  "XYZ",
  "Brand",
  "Grammage",
  "Measure",
  "2019 M11",
  "2019 M12",
  "2020 M01",
  "2020 M02",
];
const rows = [
  "A",
  "X",
  "Max bar regular",
  "190-285 gm",
  "COGS",
  "37244",
  "36883",
  "39222",
  "38153",
  "A",
  "X",
  "Max bar regular",
  "190-285 gm",
  "COGS",
  "37244",
  "36883",
  "39222",
  "38153",
  "A",
  "X",
  "Max bar regular",
  "190-285 gm",
  "COGS",
  "37244",
  "36883",
  "39222",
  "38153",
];
const dataT1 = [
  {
    ABC: "C",
    XYZ: NaN,
    "%_of_KeyFigVal": 99.0,
    Brand: "Max Bar Regular",
    Plant: "PK56",
    Grammage: "250-57 GM",
    Measure: "Demand",
    "2019 M10": NaN,
    "2019 M11": NaN,
    "2019 M12": NaN,
    "2020 M01": NaN,
    "2020 M02": NaN,
    "2020 M03": NaN,
    "2020 M04": NaN,
    "2020 M05": NaN,
    "2020 M06": NaN,
    "2020 M07": NaN,
    "2020 M08": NaN,
    "2020 M09": NaN,
    "2020 M10": NaN,
    "2020 M11": NaN,
    "2020 M12": NaN,
    "2021 M01": NaN,
    "2021 M02": NaN,
    "2021 M03": NaN,
    "2021 M04": NaN,
    "2021 M05": NaN,
    "2021 M06": NaN,
    "2021 M07": 20.0,
    "2021 M08": 47.0,
    "2021 M09": 41.0,
    "2021 M10": 66.0,
    "2021 M11": 126.0,
    "2021 M12": 41.0,
    "2022 M01": 52.0,
    "2022 M02": 39.0,
    "2022 M03": 53.0,
    "2022 M04": 37.0,
    "2022 M05": 43.0,
    "2022 M06": 45.0,
    "2022 M07": 37.0,
    "2022 M08": 36.0,
    "2022 M09": 69.0,
    "2022 M10": 59.0,
  },
];

export default function BasicTable({ profileData,tableRes,setDataT, dataT,loader }) {
  // const [dataT, setDataT] = useState({ columns: [], rows: [] });

  // const getDataT = async (query) => {
  //   // const res = await resTable(query);
  //   setDataT({ columns: tableRes?.data?.columns, rows: tableRes?.data?.data });
  // };
  // useEffect(() => {
  //   // filtersApi()
  //   getDataT({ profile: profileData });
  // }, [profileData]);

  return (
    <div className="App">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer sx={{ height: "500px" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{
                  bgcolor: "#398585",
                  color: "white",
                  border: "1px solid ",
                }}
              >
                <TableRow sx={{ border: "1px solid white", color: "white" }}>
                  {dataT?.columns?.map((elem, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      style={{
                        backgroundColor: "#398585",
                        color: "white",
                        border: "1px solid white",
                        whiteSpace: "nowrap",
                        padding: "10px",
                      }}
                    >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataT?.rows?.map((row, index) => (
                  <TableRow
                    // key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: "1px solid",
                      },
                    }}
                  >
                    {dataT?.columns?.map((keys) => (
                      <TableCell
                        key={index}
                        sx={{
                          border: "1px solid grey",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          p: "10px",
                        }}
                      >
                        {row[keys]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <DataGrid
            rows={dataT.rows}
            columns={dataT.columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            // disableRowSelectionOnClick
          /> */}
        </Box>
      </Box>
    </div>
  );
}
