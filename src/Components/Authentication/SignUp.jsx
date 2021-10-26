import React, { useState } from "react";
import { auth, generateUserDocument, firestore } from "../../Services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../Providers/AuthProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://anchorlink.vanderbilt.edu/organization/cricketclub"
        target="_blank"
      >
        VCC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("a");
  const { user, login, logout } = useAuth();

  const createUserWithEmailAndPasswordHandler = async (
    event,
    displayName,
    auth,
    email,
    password
  ) => {
    event.preventDefault();
    // try{
    //     const {user} = await createUserWithEmailAndPassword(auth, email, password);
    //     console.log(user)
    //     generateUserDocument(user, {displayName});
    //   }
    //   catch(error){
    //     setError('Error Signing up with email and password');
    //   }

    // return createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     console.log(userCredential)
    //     const user = userCredential.user;
    //     console.log(user)

    // })
    // .catch((error) => {
    //     console.log(error.code, error.message);
    // });

    // try {

    //   await firestore.collection("users").add({
    //       uid: user.uid,
    //       displayName,
    //       email
    //   });

    //   await setDoc(doc(firestore, "users", user.uid), {
    //     uid: user.uid,
    //     displayName,
    //     email
    //   });
    // } catch(error) {
    //   setError('Error Signing up with email and password');
    // }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // const user = res.user;
      // await firestore.collection("users").add({
      //   uid: user.uid,
      //   displayName,
      //   authProvider: "local",
      //   email,
      // });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else {
      setSelectedValue(event.target.value);
    }
  };

  return (
    // <div className="mt-8">
    //   <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
    //   <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
    //     {error !== null && (
    //       <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
    //         {error}
    //       </div>
    //     )}
    //     <form className="">
    //       <label htmlFor="displayName" className="block">
    //         Display Name:
    //       </label>
    //       <input
    //         type="text"
    //         className="my-1 p-1 w-full "
    //         name="displayName"
    //         value={displayName}
    //         placeholder="E.g: Faruq"
    //         id="displayName"
    //         onChange={event => onChangeHandler(event)}
    //       />
    //       <label htmlFor="userEmail" className="block">
    //         Email:
    //       </label>
    //       <input
    //         type="email"
    //         className="my-1 p-1 w-full"
    //         name="userEmail"
    //         value={email}
    //         placeholder="E.g: faruq123@gmail.com"
    //         id="userEmail"
    //         onChange={event => onChangeHandler(event)}
    //       />
    //       <label htmlFor="userPassword" className="block">
    //         Password:
    //       </label>
    //       <input
    //         type="password"
    //         className="mt-1 mb-3 p-1 w-full"
    //         name="userPassword"
    //         value={password}
    //         placeholder="Your Password"
    //         id="userPassword"
    //         onChange={event => onChangeHandler(event)}
    //       />
    //       <button
    //         className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
    //         onClick={event => {
    //           createUserWithEmailAndPasswordHandler(event, auth, email, password);
    //         }}
    //       >
    //         Sign up
    //       </button>
    //     </form>
    //     <p className="text-center my-3">
    //       Already have an account?{" "}
    //       <Link to="/" className="text-blue-500 hover:text-blue-600">
    //         Sign in here
    //       </Link>{" "}
    //     </p>
    //   </div>
    // </div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography variant="h4" component="div" gutterBottom>
            Sign Up for VCC
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Enter your information below
          </Typography>
          <Box
            component="form"
            z
            onSubmit={createUserWithEmailAndPasswordHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">ACCOUNT TYPE</FormLabel>
              <RadioGroup
                row
                aria-label="accountType"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={onChangeHandler}
              >
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="ADMIN"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="player"
                      control={<Radio />}
                      label="PLAYER"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
