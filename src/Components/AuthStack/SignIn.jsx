import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, signIn } from "../../Services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../GlobalComponents/Copyright";
import TextField from "@mui/material/TextField";

const theme = createTheme();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/userProfile");
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
            src="../../Assets/cricAvatar.jpg"
            sx={{ m: 1, bgcolor: "secondary.main" }}
          />
          <Typography variant="h4" component="div" gutterBottom>
            Log In to VCC
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Google Sign In
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signIn(email, password)}
          >
            Sign In
          </Button>
          <Link href="/reset" variant="body2">
            Forgot password?
          </Link>
          <Link href="/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
