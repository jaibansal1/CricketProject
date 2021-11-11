import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../../GlobalComponents/listItems";
import AvatarCard from "../../GlobalComponents/AvatarCard";
import Bio from "./Bio";
import Info from "./Info";
import Stats from "./Stats";
import Copyright from "../../GlobalComponents/Copyright";
import { Drawer, AppBar } from "../../StyledComponents/StyledComponents";

import { Link } from "@mui/material";
import { Button } from "@mui/material";

import { auth, db } from "../../../Services/firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import Header from "../../GlobalComponents/Header";
const mdTheme = createTheme();

const DashboardContent = () => {
  const [user, loading, error] = useAuthState(auth);
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

  const playerRef = collection(db, "admin");
  const fetchUserData = async () => {
    try {
      const q = query(playerRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
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
            titleProp={"VCC Profile"}
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
                  <AvatarCard
                    nameProp={userData.name}
                    roleProp={userData.role}
                  />
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
                  <Info
                    yearProp={userData.grade}
                    batProp={userData.bat}
                    bowlProp={userData.bowl}
                  />
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
                  <Bio bioProp={userData.bio} />
                </Paper>
                
               
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Stats statProp={userData.matches} />
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, ml: 60 }}>
            <Link
              href="/editProfile"
              underline="none"
            >
              <Button variant="contained">Edit Profile </Button>
            </Link>
            </Box>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const UserProfile = () => {
  return <DashboardContent />;
};

export default UserProfile;
