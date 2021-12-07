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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db } from "../../../Services/firebase";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

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
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [matchType, setMatchType] = useState("");
  const [runs, setRuns] = useState(0);

//   const [newInnings, setNewInnings] = useState(0);
//   const [newRuns, setNewRuns] = useState(0);
//   const [newAverage, setNewAverage] = useState(0);
//   const [newHS, setNewHS] = useState(0);


  //root reference
  const storage = getStorage();

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    //reference to currrent document id
    const storageRef = ref(storage, `/images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setImageFile(null);
        setImageUrl(url);
      });
      console.log("Uploaded a blob or file!");
    });
    console.log(imageFile, imageUrl);
  };
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
        setImageUrl(doc.data().image);
        setCurrentDocID(doc.id);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const writeUserData = async (matchType, runs) => {
    try {
      const docRef = doc(db, "player", currentDocId);
      console.log(matchType, runs);

      if (matchType === "T20") {
        console.log(userData);

        console.log("DB innings: " + userData.t20Innings);
        console.log("DB Runs: " + userData.t20Runs);
        console.log("DB average: " + userData.t20Average);

        let newInnings = userData.t20Innings + 1;
        let newRuns = parseInt(userData.t20Runs) + parseInt(runs);
        let newAverage = (newRuns / newInnings);

        let newHS = parseInt(userData.t20HS);
        if (runs > newHS) {
            newHS = runs;
        }

        // setNewInnings(userData.t20Innings + 1);
        // setNewRuns(userData.t20Runs + runs);
        // setNewAverage(newRuns / newInnings);

        console.log("New Innings: " + newInnings);
        console.log("New Runs: " + newRuns);
        console.log("New Average: " + newAverage);

        //   if (runs > userData.t20HS) {
        //       setNewHS(runs);
        //   }
        //   else {
        //       setNewHS(userData.t20HS);
        //   }

        

          await updateDoc(docRef, {
            t20Innings: newInnings,
            t20Runs: newRuns,
            t20Average: newAverage,
            t20HS: newHS,
          });
      }

      if (matchType === "T12") {
        // setNewInnings(userData.t12Innings + 1);
        // setNewRuns(userData.t12Runs + runs);
        // setNewAverage(newRuns / newInnings);
        //   if (runs > userData.t12HS) {
        //       setNewHS(runs);
        //   }
        //   else {
        //       setNewHS(userData.t12HS);
        //   }

        let newInnings = userData.t12Innings + 1;
        let newRuns = parseInt(userData.t12Runs) + parseInt(runs);
        let newAverage = (newRuns / newInnings);

        let newHS = parseInt(userData.t12HS);
        if (runs > newHS) {
            newHS = runs;
        }


          await updateDoc(docRef, {
            t12Innings: newInnings,
            t12Runs: newRuns,
            t12Average: newAverage,
            t12HS: newHS,
          });
      }
      if (matchType === "Practice") {
        // setNewInnings(userData.PracticeInnings + 1);
        // setNewRuns(userData.PracticeRuns + runs);
        // setNewAverage(newRuns / newInnings);
        //   if (runs > userData.PracticeHS) {
        //       setNewHS(runs);
        //   }
        //   else {
        //       setNewHS(userData.PracticeHS);
        //   }

        let newInnings = userData.PracticeInnings + 1;
        let newRuns = parseInt(userData.PracticeRuns) + parseInt(runs);
        let newAverage = (newRuns / newInnings);

        let newHS = parseInt(userData.PracticeHS);
        if (runs > newHS) {
            newHS = runs;
        }

          await updateDoc(docRef, {
            PracticeInnings: newInnings,
            PracticeRuns: newRuns,
            PracticeAverage: newAverage,
            PracticeHS: newHS,
          });
      }
    //   await updateDoc(docRef, {
    //     name: name,
    //     grade: grade,
    //     role: role,
    //     bat: bat,
    //     bowl: bowl,
    //     bio: bio,
    //     image: imageUrl,
    //   });
      history.replace("/userProfile");
    } catch (err) {
      console.error(err);
      alert("An error occured while updating user data");
    }
  };

  const getImage = async () => {
    getDownloadURL(
      ref(storage, `/images/${imageFile.name}`)
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          // const xhr = new XMLHttpRequest();
          // xhr.responseType = "blob";
          // xhr.onload = (event) => {
          //   const blob = xhr.response;
          // };
          // xhr.open("GET", url);
          // xhr.send();

          // Or inserted into an <img> element
          const img = document.getElementById("avatar");
          img.setAttribute("src", url);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        })
    );
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
            height: "100vh",
            overflow: "auto",
            alignItems: "center",
            flexDirections: "column",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* <div>
              <form onSubmit={handleUpload}>
                <input type="file" onChange={handleChange} />
                <button disabled={!imageFile}>Upload Avatar</button>
              </form>
              <img
                src={imageUrl}
                style={{
                  verticalAlign: "middle",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
                id="avatar"
                alt="avatar"
              />
            </div> */}

            <TextField
              multiline
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
              fullWidth
              name="type"
              label="Match Type"
              id="type"
              onChange={(event) => setMatchType(event.target.value)}
            />
            <TextField
              multiline
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
              fullWidth
              name="runs"
              label="Runs Scored"
              id="runs"
              onChange={(event) => setRuns(event.target.value)}
            />
            {/* <TextField
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
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                writeUserData(matchType, runs)
              }
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
