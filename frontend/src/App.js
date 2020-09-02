import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BackgroundVideo from './pages/BackgroundVideo';
import LoadTemplate from './pages/LoadTemplate';
import StyledButton from './components/styled/StyledButton';

export default function App() {

  const [signIn, toggleSignIn] = useState(false);
  const [signUp, toggleSignUp] = useState(false);
  const [buttons, toggleButtons] = useState(true);
  
  //keeping this here until logOut is built
  const [loggedIn, isLoggedIn] = useState(false);

  const renderSignIn = () => {
    toggleButtons(!buttons);
    toggleSignIn(!signIn);
  };

  const renderSignUp = () => {
    toggleButtons(!buttons);
    toggleSignUp(!signUp);
  };

  const handleSignSwitch = () => {
    toggleSignIn(!signIn);
    toggleSignUp(!signUp);
  }

  const handleLogIn = (user) => {
    sessionStorage.setItem('user', user)
    toggleButtons(false);
    toggleSignIn(false);
    toggleSignUp(false);
    isLoggedIn(true);
  }

  return (
    <Switch>
      <Route path="/load" component={LoadTemplate} />
      <Route path="/">
        {loggedIn ? <Redirect to="/load" /> : null}
        <Box display="flex" height='100vh' alignItems="center" justifyContent="center">
          <BackgroundVideo />
          {buttons ?
            <Grid container justify="center" alignItems="center" spacing={0}>
              <Grid item xs={12} align="center">
                <h1><span>BRAVURA<sup style={{ fontSize: '20px', position: 'relative', bottom: '20px' }}>©</sup></span></h1>
              </Grid>
              <Grid item xs={12} align="center" >
                <StyledButton onClick={renderSignIn} label="Sign In" />
                <StyledButton onClick={renderSignUp} label="Sign Up" />
              </Grid>
            </Grid>
            : null}
          {signIn ?
            <SignIn backButton={renderSignIn} signSwitch={handleSignSwitch} logIn={handleLogIn} />
            : null}
          {signUp ?
            <SignUp backButton={renderSignUp} signSwitch={handleSignSwitch} />
            : null}
        </Box>
      </Route>
    </Switch>
  );
};