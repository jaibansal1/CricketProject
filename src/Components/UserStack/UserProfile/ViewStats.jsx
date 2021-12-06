import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../GlobalComponents/Title";

import { auth, db } from "../../../Services/firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { Button } from "@mui/material";

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

const ViewStats = (props) => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserData();
  }, [user, loading]);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const playerRef = collection(db, "player");
  const fetchUserData = async () => {
    try {
      const q = query(playerRef, where("uid", "==", props.uidProp));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

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
            <TableCell>HS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>T20</TableCell>
            <TableCell>{userData.t20Innings}</TableCell>
            <TableCell>{userData.t20Runs}</TableCell>
            <TableCell>{userData.t20Average}</TableCell>
            <TableCell>{userData.t20HS}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>T12</TableCell>
            <TableCell>{userData.t12Innings}</TableCell>
            <TableCell>{userData.t12Runs}</TableCell>
            <TableCell>{userData.t12Average}</TableCell>
            <TableCell>{userData.t12HS}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Practice</TableCell>
            <TableCell>{userData.PracticeInnings}</TableCell>
            <TableCell>{userData.PracticeRuns}</TableCell>
            <TableCell>{userData.PracticeAverage}</TableCell>
            <TableCell>{userData.PracticeHS}</TableCell>
          </TableRow>

          {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.innings}</TableCell>
              <TableCell>{row.runs}</TableCell>
              <TableCell>{row.avg}</TableCell>
              <TableCell>{row.sr}</TableCell>
              <TableCell align="right">{`${row.hs}`}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
export default ViewStats;
