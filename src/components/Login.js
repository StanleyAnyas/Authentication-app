import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { auth } from "../Firebase";
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import SignUpForm from './Signup';
import ResetPassword from "./ResetPassword";

import {
  Button,
  Grid,
  TextField,
} from "@mui/material";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  <Router>
        <Link to="/signup"></Link>
        <Link to="/resetpassword"></Link>
        <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
    </Router>

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      })   ;
    };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" mb={3}>
            Welcome Back!
          </Typography>
          <Typography variant="h4" align="center" mb={3}>
            Login
          </Typography>
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
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
            <Typography variant="body2" align="center" mt={2}>
                Don't have an account? <span><a href="/signup">Sign up</a></span>
            </Typography>
            <Typography variant="body2" align="center" mt={2}>
                Forgot your password? <span><a href="/resetpassword">Reset password</a></span>
            </Typography>
            <Typography variant="body2" align="center" mt={2}>
                {error ? <p>{error}</p> : null}
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignInForm;