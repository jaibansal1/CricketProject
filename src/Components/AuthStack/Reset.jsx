import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, resetPassword } from "../../Services/firebase";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../GlobalComponents/Copyright";

import cricAvatar from "../../Assets/cricAvatar.jpeg";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/userDashboard");
  }, [user, loading]);

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
          <Avatar
            src={cricAvatar}
            sx={{ m: 1, bgcolor: "secondary.main", width: 100, height: 100 }}
          />
          <Typography variant="h4" component="div" gutterBottom>
            Forgot Password?
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Enter your email below
          </Typography>
          <TextField
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
          >
            Reset Password
          </Button>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
          <div>
            <Link to="/">Sign In</Link> now.
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Reset;
