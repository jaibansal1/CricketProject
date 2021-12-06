import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, register } from "../../Services/firebase";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import Copyright from "../GlobalComponents/Copyright";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import cricAvatar from "../../Assets/cricAvatar.jpeg";

const theme = createTheme();

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [t20Innings, setT20Innings] = useState(0);
  const [t20Average, setT20Average] = useState(0);
  const [t20Runs, setT20Runs] = useState(0);
  const [t20HS, setT20HS] = useState(0);
  const [t12Innings, setT12Innings] = useState(0);
  const [t12Average, setT12Average] = useState(0);
  const [t12Runs, setT12Runs] = useState(0);
  const [t12HS, setT12HS] = useState(0);
  const [practiceInnings, setPracticeInnings] = useState(0);
  const [practiceAverage, setPracticeAverage] = useState(0);
  const [practiceRuns, setPracticeRuns] = useState(0);
  const [practiceHS, setPracticeHS] = useState(0);
  const [bat, setBat] = useState("");
  const [bio, setBio] = useState("");
  const [bowl, setBowl] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/userProfile");
  }, [user, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Register for VCC
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">ACCOUNT TYPE</FormLabel>
              <RadioGroup
                row
                aria-label="accountType"
                name="row-radio-buttons-group"
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
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
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full Name"
            type="name"
            id="name"
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setEmail(event.target.value)}
          />
          {email && !/\S+@\S+\.\S+/.test(email) && (
            <span className="error" data-testid="error-msg">
              Please enter a valid email.
            </span>
          )}
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
            onClick={() =>
              register(
                name,
                email,
                accountType,
                password,
                t20Innings,
                t20Runs,
                t20Average,
                t20HS,
                t12Innings,
                t12Runs,
                t12Average,
                t12HS,
                practiceInnings,
                practiceRuns,
                practiceAverage,
                practiceHS,
                bat,
                bowl,
                grade,
                image,
                bio,
                role
              )
            }
          >
            Register
          </Button>
          <div>
            <Link to="/">Sign In</Link> with existing account.
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
