import './App.css';
import React from 'react';
//import { AuthProvider } from './components/AuthProvider';
import SignInForm from './components/Login';
import SignUpForm from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
          <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
