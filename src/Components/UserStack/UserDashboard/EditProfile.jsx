import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../../GlobalComponents/listItems";

import Copyright from "../../GlobalComponents/Copyright";
import { AppBar, Drawer } from "../../StyledComponents/StyledComponents";
import Header from "../../GlobalComponents/Header";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../Services/firebase";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

// import { updateProfile, writeUserData } from "../../../Services/firebase";

const mdTheme = createTheme();

const FormView = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState("");
  const [currentDocId, setCurrentDocID] = useState("");

  const [bat, setBat] = useState("");
  const [bio, setBio] = useState("");
  const [bowl, setBowl] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

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
      const q = query(playerRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
        setBat(doc.data().bat);
        setBio(doc.data().bio);
        setBowl(doc.data().bowl);
        setGrade(doc.data().grade);
        setRole(doc.data().role);
        setName(doc.data().name);
        setCurrentDocID(doc.id);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const writeUserData = async (name, grade, role, bat, bowl, bio) => {
    try {
      const docRef = doc(db, "player", currentDocId);
      console.log(name, grade, role, bat, bowl, bio);
      await updateDoc(docRef, {
        name: name,
        grade: grade,
        role: role,
        bat: bat,
        bowl: bowl,
        bio: bio,
      });
      history.replace("/userProfile");
    } catch (err) {
      console.error(err);
      alert("An error occured while updating user data");
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
              fullWidth
              name="bat"
              label="Bats:"
              style={{ textAlign: "left" }}
              id="bat"
              defaultValue={userData.bat}
              onChange={(event) => setBat(event.target.value)}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              multiline
              margin="normal"
              required
              fullWidth
              name="bio"
              label="Player Biography:"
              id="bio"
              defaultValue={userData.bio}
              onChange={(event) => setBio(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => writeUserData(name, grade, role, bat, bowl, bio)}
            >
              Save
            </Button>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const EditProfile = () => {
  return <FormView />;
};

export default EditProfile;
