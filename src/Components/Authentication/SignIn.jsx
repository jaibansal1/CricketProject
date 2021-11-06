import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth, auth } from "../../Providers/AuthProvider";
import Copyright from "../GlobalComponents/Copyright";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Login } from "@mui/icons-material";
const theme = createTheme();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const correo = e.target.email.value;
  //   const contra = e.target.password.value;

  //   // if (estaRegistrandose) {
  //   //   //si se registra
  //   //   const usuario = await createUserWithEmailAndPassword(
  //   //     auth,
  //   //     correo,
  //   //     contra
  //   //   );
  //   // } else {
  //   // si está iniciando sesión
  //   signInWithEmailAndPassword(auth, correo, contra);
  //   // }
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.emailField.value);
    setPassword(e.target.passwordField.value);
    console.log(email);
    console.log(password);
    logIn(e.target.emailField.value, e.target.passwordField.value);
  };

  return (
    <div>
      <h1>Header</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField"> Correo </label>
        <input type="email" id="emailField" />
        <label htmlFor="passwordField"> Contraseña </label>
        <input type="password" id="passwordField" />
        <button type="submit">button</button>
      </form>
    </div>
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar
    //         src="../../Assets/cricAvatar.jpg"
    //         sx={{ m: 1, bgcolor: "secondary.main" }}
    //       />
    //       <Typography variant="h4" component="div" gutterBottom>
    //         Log In to VCC
    //       </Typography>
    //       <Typography variant="subtitle1" gutterBottom component="div">
    //         Google Sign In
    //       </Typography>
    //       <Box
    //         component="form"
    //         noValidate
    //         sx={{ mt: 1 }}
    //         // onSubmit={submitHandler}
    //       >
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //           onChange={(event) => setEmail(event.target.value)}
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //           onClick={() => logIn(email, password)}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="/passwordReset" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="/signUp" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //     <Copyright sx={{ mt: 8, mb: 4 }} />
    //   </Container>
    // </ThemeProvider>
  );
};

export default SignIn;
