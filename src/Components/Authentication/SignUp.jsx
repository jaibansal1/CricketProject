import { useState } from "react";
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
import Copyright from "../GlobalComponents/Copyright";
import TextField from "@mui/material/TextField";

const theme = createTheme();

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const  register  = useAuth();

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
          <Typography variant="h4" component="div" gutterBottom data-testid="signup-header">
            Sign Up for VCC
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={() =>
              register(firstName, lastName, email, password, accountType)
            }
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">ACCOUNT TYPE</FormLabel>
              <RadioGroup
                row
                aria-label="accountType"
                name="row-radio-buttons-group"
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
                //inputProps={{ "data-testid": "acctype" }}
                data-testid="acctype"
              >
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="ADMIN"
                      data-testid="adminChoice"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="player"
                      control={<Radio />}
                      label="PLAYER"
                      data-testid="playerChoice"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value)}
                  inputProps={{ "data-testid": "fname-field" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(event) => setLastName(event.target.value)}
                  inputProps={{ "data-testid": "lname-field" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  inputProps={{ "data-testid": "email-field" }}
                />
                  {email && !(/\S+@\S+\.\S+/).test(email) && <span className="error" data-testid="error-msg">Please enter a valid email.</span>}

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                  inputProps={{ "data-testid": "password-field" }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                register(firstName, lastName, email, password, accountType)
              }
              data-testid ="submit-button"
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
