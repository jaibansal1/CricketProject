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
  const { resetPassword } = useAuth();

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
  //     .catch(() => {
  //       setError("Error resetting password");
  //     });
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
          <Typography variant="h4" component="div" gutterBottom>
            Forgot Password?
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Enter your email below
          </Typography>
          <Box
            component="form"
            // onSubmit={sendResetEmail}
            noValidate
            sx={{ mt: 1 }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => resetPassword(email)}
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
