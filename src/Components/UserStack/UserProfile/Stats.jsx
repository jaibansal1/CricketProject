import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../GlobalComponents/Title";

// Generate Order Data
function createData(id, type, innings, runs, avg, sr, hs) {
  return { id, type, innings, runs, avg, sr, hs };
}

const rows = [
  createData(0, "Practice", 11, 110, 10, 121, 45),
  createData(1, "T20", 2, 30, 15, 84.2, 11),
  createData(2, "T12", 2, 30, 15, 84.2, 11),
];

function preventDefault(event) {
  event.preventDefault();
}
const Stats = (props) => {
  return (
    <React.Fragment>
      <Title>Player Stats</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Innings</TableCell>
            <TableCell>Runs</TableCell>
            <TableCell>Average</TableCell>
            <TableCell>SR</TableCell>
            <TableCell align="right">HS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.innings}</TableCell>
              <TableCell>{row.runs}</TableCell>
              <TableCell>{row.avg}</TableCell>
              <TableCell>{row.sr}</TableCell>
              <TableCell align="right">{`${row.hs}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more stats
      </Link>
    </React.Fragment>
  );
};
export default Stats;
