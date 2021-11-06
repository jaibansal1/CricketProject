import React, { useState } from "react";
// import { auth } from "../firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../Providers/AuthProvider";

const theme = createTheme();

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const resetPassword  = useAuth();

  // const sendResetEmail = (event) => {
  //   event.preventDefault();
  //   auth
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       setEmailHasBeenSent(true);
  //       setTimeout(() => {
  //         setEmailHasBeenSent(false);
  //       }, 3000);
  //     })
  //     .catch((error) => console.log(error));
  // };

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
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            data-testid="reset-header"
          >
            Forgot Password?
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            data-testid="reset-subheader"
          >
            Enter your email below
          </Typography>
          <Box
            component="form"
            // onSubmit={sendResetEmail}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              inputProps={{
                "data-testid": "email-input",
              }}
              placeholder="Enter email"
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            {email && !/\S+@\S+\.\S+/.test(email) && (
              <span className="error" data-testid="error-msg">
                Please enter a valid email.
              </span>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => resetPassword(email)}
              data-testid="reset-submit"
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordReset;
