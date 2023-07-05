'use client'

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

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

export default function BasicTable() {
  return (
    <div className="App">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer sx={{ height: '500px' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{
                  bgcolor: "#398585",
                  color: "white",
                  border: "1px solid ",
                }}
              >
                <TableRow sx={{ border: "1px solid white", color: "white" }}>
                  {headerData.map((elem, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      style={{
                        backgroundColor: "#398585",
                        color: "white",
                        border: "1px solid white",
                        whiteSpace: 'nowrap',
                        padding: '10px'
                      }}
                    >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
                  
                ))} */}

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow
                  // key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: '1px solid gray' } }}
                >
                  {rows.map((elem, index) => (
                    <TableCell key={index} sx={{ border: '1px solid grey', textAlign: 'center', whiteSpace: 'nowrap', p: '10px' }} >
                      {elem}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}