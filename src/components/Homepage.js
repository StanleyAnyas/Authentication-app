import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NavigationBar from './Navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignInForm from './Login';
import SignUpForm from './Signup';

export default function Homepage() {
    <Router>
        <Link to="/login"></Link>
        <Link to="/signup"></Link>
        <Link to="/navigation"></Link>
        <Routes>
            <Route path="/login" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/navigation" element={<NavigationBar />} />
        </Routes>
    </Router>

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignup = () => {
        navigate('/signup');
    }
    
    const handleNavigation = () => {
        navigate('/navigation');
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleNavigation} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stan App
          </Typography>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
            <Button color="inherit" onClick={handleSignup}>Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}