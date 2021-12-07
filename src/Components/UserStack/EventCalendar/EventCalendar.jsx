import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";

import { auth, db, logout } from "../../../Services/firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../../GlobalComponents/listItems";

import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Text } from "recharts";
import Cal from "./Cal";
import Copyright from "../../GlobalComponents/Copyright";
import Header from "../../GlobalComponents/Header";
import {
  AppBar,
  Drawer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../StyledComponents/StyledComponents";
import { collection, where, query, getDocs } from "firebase/firestore";

import ApiCalendar from "react-google-calendar-api";

const mdTheme = createTheme();

const RosterAdminView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserData();
  }, [user, loading]);

  const playerRef = collection(db, "player");

  const fetchUserData = async () => {
    try {
      const q = query(playerRef, where("uid", "==", auth.currentUser.uid));
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
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Header
            openProp={open}
            titleProp={"VCC Calendar"}
            dataProp={userData}
            toggleProp={toggleDrawer}
          />
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Box sx={{ mt: 10, ml: 13 }}>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=group10cricket%40gmail.com&ctz=America%2FChicago"
              width="1000"
              height="600"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </Box>
          {/* <Cal /> */}
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Player Cards */}
              <Grid item xs={12} md={4} lg={3}></Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const AdminDashboard = () => {
  return <RosterAdminView />;
};

export default AdminDashboard;
