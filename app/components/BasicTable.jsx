import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { makeStyles } from "@mui/styles";
// import { Box } from "@mui/material";

function createData(name, text) {
  return { name, text };
}

const rows = [
  createData("A", "a text"),
  createData("B", "b text"),
  createData("C", "c text"),
];
// const useStyles = makeStyles({
//   table: {
//     //   minWidth: 350,
//     "& .MuiTableCell-root": {
//       border: "1px solid black",
//     },
//   },
// });

function BasicTable() {
  // const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ mt: "50px", width: "100%" }} >
      <Table
        // className={classes.table}
        sx={{ width: "100%" }}
        aria-label="simple table"
      >
        <TableHead sx={{ bgcolor: "#398585" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">
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
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center" key={index}>{row.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;
