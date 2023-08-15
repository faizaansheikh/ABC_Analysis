'use client'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      backgroundColor: "#3985850f",
      textAlign: "right !important",
      borderColor: "#398585",
    },
  },
});

// const useStyles = makeStyles({
//   table: {
//     //   minWidth: 350,
//     "& .MuiTableCell-root": {
//       border: "1px solid black",
//     },
//   },
// });

function BasicTable({ inputVals, setInputVals, setTotalValue }) {
  const handleTableValue = (e) => {
    const { name, value } = e.target;
    // let name = e.target.name;
    // let value = e.target.value

    const newValue = {
      ...inputVals,
      [name]: parseFloat(value),
    };
    setInputVals(newValue);

    calTotal(newValue);
  };

  const calTotal = (newValue) => {
    const { A, B, C } = newValue;
    const newTotal = A + B + C;
    setTotalValue(newTotal);
  };

  function createData(name, text) {
    return { name, text };
  }

  const rows = [
    createData(
      "A",
      <CssTextField
        size="small"
        fullWidth
        type="number"
        name="A"
        onChange={handleTableValue}
        value={parseInt(inputVals.A)}
      />
    ),
    createData(
      "B",
      <CssTextField
        size="small"
        fullWidth
        type="number"
        name="B"
        onChange={handleTableValue}
        value={inputVals.B}
      />
    ),
    createData(
      "C",
      <CssTextField
        size="small"
        fullWidth
        type="number"
        name="C"
        onChange={handleTableValue}
        value={inputVals.C}
      />
    ),
  ];
  return (
    <TableContainer component={Paper} sx={{ mt: "50px", width: "100%" }}>
      <Table
        sx={{ width: "100%" }}
        aria-label="simple table"
      >
        <TableHead sx={{ bgcolor: "#398585" }}>
          <TableRow>
            <TableCell
              sx={{
                color: "white",
                fontSize: "16px",
                borderRight: "1px solid #0000001f !important",
              }}
              align="center"
            >
              Group
            </TableCell>
            <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">
              Threshold
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                component="th"
                scope="row"
                sx={{ padding: "0px", borderRight: "1px solid #00000042" }}
              >
                {row.name}
              </TableCell>
              <TableCell align="center" key={index} sx={{ padding: "0px" }}>
                {row.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;
