import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import {
  Button,
  Grid,
  TextField,
} from "@mui/material";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
    };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" mb={3}>
            Create new password
          </Typography>
          <Typography variant="body2" align="center" mt={2} style={{color: "red"}}>
                Please enter the email address you used to register your account.
            </Typography>
            <br/>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Enter your email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Enter new password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Confirm new password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
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
                Reset password
            </Button>
            <Typography variant="body2" align="center" mt={2}>
                {error ? <p>{error}</p> : null}
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;