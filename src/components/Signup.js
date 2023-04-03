import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Button, Grid, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignInForm from './Login';
import { sendEmailVerification } from "firebase/auth";
import { db } from '../Firebase';
import { AuthContext } from "./AuthProvider";
import LandingPage from "./LandingPage";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  <Router>
  <Link to="/login"></Link>
  <Link to="/landingpage"></Link>
  <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route path="/landingpage" element={<LandingPage />} />
  </Routes>
</Router>

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setdisplayName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => { 
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    } else if (!checked) {
      setError("You must agree to the terms and conditions");
      return;
    }
     try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser)
            const user = userCredential.user;
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
            });
            setIsSignedUp(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div style={{paddingBottom: 1112}}>
    <AuthContext.Provider value={{ email, displayName }}>
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" mb={3}>
            Create Account
          </Typography>
          <Typography variant="body2" align="center" mt={2} style={{color: "red"}}>
            Fields marked with * are required
          </Typography>
          <br/>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Username"
                type="text"
                value={displayName}
                onChange={handleDisplayNameChange}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
                Sign Up
            </Button>
            <Typography variant="body2" align="center" mt={2}>
            <Checkbox {...label} onClick={handleCheckedChange} /> By signing up, you agree to our <span><a href="{}" target={"_blank"}>Terms of Service</a></span> and <span><a href="{}" target={"_blank"}>Privacy Policy</a></span>
            </Typography>
            <Typography variant="body2" align="center" mt={2}>
                Have an account already? <span><a href="/login">Login</a></span>
            </Typography>
            <Typography variant="body2" align="center" mt={2}>
                {error ? <p style={{color: "red"}}>{error}</p> : null}
            </Typography>
                {isLoading && <CircularProgress />}
          </form>
        </Paper>
      </Grid>
    </Grid>
    {isSignedUp && <LandingPage displayName={displayName} />}
    </AuthContext.Provider>
    </div>
  );
};

export default SignUpForm;