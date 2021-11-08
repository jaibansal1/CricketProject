import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../../Services/firebase";

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
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../../GlobalComponents/listItems";
import AvatarCard from "../../GlobalComponents/AvatarCard";
import Bio from "./Bio";
import Info from "./Info";
import Orders from "./Orders";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Text } from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import Copyright from "../../GlobalComponents/Copyright";
import Button from "@mui/material/Button";
import {
  AppBar,
  Drawer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../StyledComponents/StyledComponents";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  getDoc,
  query,
  getDocs,
  doc,
  setDoc,
  ref,
} from "firebase/firestore";

const mdTheme = createTheme();

const DashboardContent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const playerRef = collection(db, "player");
  const fetchUserData = async () => {
    try {
      // const query = getDoc(playerRef.);
      // const q = query(playerRef, where("uid", "==", user?.uid));
      // console.log(q);
      const querySnapshot = await getDocs(playerRef);
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
      console.log(querySnapshot);
      // const q = query(querySnapshot, where("uid", "==", user?.uid));
      // console.log(querySnapshot.data().name);
      // const docRef = doc(db, "player", auth.currentUser.uid);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = await docSnap.data();
      //   setName(data.name);

      //   console.log("Document data:", data);
      // } else {
      //   console.log("No such document!");
      // }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");

    fetchUserData();
  }, [user, loading]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              VCC Player
            </Typography>
            <Button variant="contained" onClick={logout}>
              Log Out
            </Button>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Text>{name}</Text>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          </Toolbar>
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <AvatarCard nameProp={name} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Info />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Bio />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const UserProfile = () => {
  // const user = useContext(UserContext);
  //   const user = "akdfsn"
  // const {photoURL, displayName, email} = user;
  // console.log(user);
  return <DashboardContent />;
  // <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
  //   <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
  //     <div
  //       style={{
  //         background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
  //         backgroundSize: "cover",
  //         height: "200px",
  //         width: "200px"
  //       }}
  //       className="border border-blue-300"
  //     ></div>
  //     <div className = "md:pl-4">
  //     <h2 className = "text-2xl font-semibold">{displayName}</h2>
  //     <h3 className = "italic">{email}</h3>
  //     </div>
  //   </div>
  //   <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
  // </div>
};

export default UserProfile;
