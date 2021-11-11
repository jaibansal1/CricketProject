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

import Copyright from "../../GlobalComponents/Copyright";
import { AppBar, Drawer } from "../../StyledComponents/StyledComponents";
import Header from "../../GlobalComponents/Header";
import { collection, where, query, getDocs } from "firebase/firestore";
import { auth, db, writeUserData } from "../../../Services/firebase";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";

// import { updateProfile, writeUserData } from "../../../Services/firebase";

const mdTheme = createTheme();

const RosterUserView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState("");


  const [name,setName] = useState("");
  const [grade,setGrade] = useState("");
  const [role,setRole] = useState("");
  const [bat,setBat] = useState("");
  const [bowl,setBowl] = useState("");
  const [bio,setBio] = useState("");


  const history = useHistory();


  var condition = true;



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
            titleProp={"Edit Your Profile Details!"}
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
          <TextField
            multiline
            InputLabelProps={{shrink:true}}
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full Name"
            type="name"
            id="name"
            defaultValue={userData.name}
            onChange={(event) => setName(event.target.value)}
          />
           <TextField
            multiline
            InputLabelProps={{shrink:true}}
            margin="normal"
            required
            fullWidth
            name="name"
            label="Grade"
            id="grade"
            defaultValue={userData.grade}
            onChange={(event) => setGrade(event.target.value)}
          />
          <TextField
            multiline
            InputLabelProps={{shrink:true}}
            margin="normal"
            required
            fullWidth
            name="role"
            label="Role"
            id="role"
            defaultValue={userData.role}
            onChange={(event) => setRole(event.target.value)}
          />
          <TextField
            multiline
            InputLabelProps={{shrink:true}}
            margin="normal"
            required
            fullWidth
            name="bat"
            label="Bats:"
            style={{textAlign: 'left'}}
            id="bat"
            defaultValue={userData.bat}
            onChange={(event) => setBat(event.target.value)}
          />
          <TextField
          InputLabelProps={{shrink:true}}
            multiline
            margin="normal"
            required
            fullWidth
            name="bowl"
            label="Bowls:"
            id="bowl"
            defaultValue={userData.bowl}
            onChange={(event) => setBowl(event.target.value)}
          />
          <TextField
          InputLabelProps={{shrink:true}}
            multiline
            margin="normal"
            required
            fullWidth
            name="bio"
            label="Player Biography:"
            id="bio"
            defaultValue= {userData.bio}
            onChange={(event) => setBio(event.target.value)}
          />
        <Link
              href="/userProfile"
              underline="none"
            >
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => writeUserData(name, grade, role, bat, bowl,bio)}
          >
            Save
          </Button>
          </Link>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const UserDashboard = () => {
  return <RosterUserView />;
};

export default UserDashboard;
