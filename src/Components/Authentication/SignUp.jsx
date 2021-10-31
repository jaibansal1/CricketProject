import React, { useState } from "react";
import { auth, generateUserDocument, firestore } from "../../Services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../Providers/AuthProvider";
import Copyright from "../Static/Copyright";

const theme = createTheme();

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const { user, login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setFullName(value);
    } else {
      setSelectedValue(event.target.value);
    }
  };

  return (
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
            Google Sign Up
          </Typography>
          <Box
            component="form"
            z
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
