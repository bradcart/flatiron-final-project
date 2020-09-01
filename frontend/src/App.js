import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BackgroundVideo from './pages/BackgroundVideo';
import StyledButton from './components/styled/StyledButton';

export default function App() {

  const [signIn, toggleSignIn] = useState(false);
  const [signUp, toggleSignUp] = useState(false);
  const [buttons, toggleButtons] = useState(true);

  const handleSignIn = () => {
    toggleButtons(!buttons);
    toggleSignIn(!signIn);
  };

  const handleSignUp = () => {
    toggleButtons(!buttons);
    toggleSignUp(!signUp);
  };

  const handleSignSwitch = () => {
    toggleSignIn(!signIn)
    toggleSignUp(!signUp)
  }

  return (
    <div className="App">
      <Box display="flex" height='100vh' alignItems="center" justifyContent="center">
        <BackgroundVideo />
        {buttons ?
          <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={12} align="center">
              <h1><span>BRAVURA<sup style={{ fontSize: '20px', position: 'relative', bottom: '20px' }}>©</sup></span></h1>
            </Grid>
            <Grid item xs={12} align="center" >
              <StyledButton onClick={handleSignIn} label="Sign In" />
              <StyledButton onClick={handleSignUp} label="Sign Up" />
            </Grid>
          </Grid>
          : null}
        {signIn ?
          <SignIn backButton={handleSignIn} signSwitch={handleSignSwitch} />
          : null}
        {signUp ?
          <SignUp backButton={handleSignUp} signSwitch={handleSignSwitch} />
          : null}
      </Box>
    </div>
  );
};