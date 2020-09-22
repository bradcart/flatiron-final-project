import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
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
import Page from './pages/Page';
import Edit from './pages/Edit';
import Dashboard from './pages/Dashboard';
import LoadPage from './pages/LoadPage';
import LoadProject from './pages/LoadProject';


const App = () => {

  const [signIn, toggleSignIn] = useState(false);
  const [signUp, toggleSignUp] = useState(false);
  const [buttons, toggleButtons] = useState(true);
  const [username, setUsername] = useState('');

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

  const handleLogIn = (json) => {
    setUsername(json.user.username);
    localStorage.setItem('token', json.token);
    localStorage.setItem('user', JSON.stringify(json.user));
    toggleButtons(false);
    toggleSignIn(false);
    toggleSignUp(false);
    isLoggedIn(true);
  }

  return (
    <Switch>
      <Route path='/:username/dashboard' component={Dashboard} />
      <Route path='/:username/templates/:id/edit' component={Edit} />
      <Route path='/:username/templates' component={LoadTemplate} />
      <Route path='/:username/projects/:id/edit' component={Edit} />
      <Route path='/:username/projects' component={LoadProject} />
      <Route path='/:username/pages/:id' component={Page} />
      <Route path='/:username/pages' component={LoadPage} />

      <Route exact path="/">
        {/* <Fade in={true} timeout={{ enter: 1000 }}>
          <div> */}
        <BackgroundVideo fileName='clip1.mp4' />
        {loggedIn ? <Redirect to={`/${username}/dashboard`} /> : null}
        <Box display="flex" height='100vh' alignItems="center" justifyContent="center">
          {buttons ?
            <Grid container justify="center" alignItems="center" spacing={0}>
              <Grid item xs={12} align="center">
                <h1><span>REACTORY<sup style={{ fontSize: '20px', position: 'relative', bottom: '20px' }}>©</sup></span></h1>
              </Grid>
              <Grid item xs={12} align="center" >
                <StyledButton onClick={renderSignIn}>Sign In</StyledButton>
                <StyledButton onClick={renderSignUp}>Sign Up</StyledButton>
              </Grid>
            </Grid>
            : null}
          {signIn ?
            <SignIn backButton={renderSignIn} signSwitch={handleSignSwitch} logIn={handleLogIn} />
            : null}
          {signUp ?
            <SignUp backButton={renderSignUp} signSwitch={handleSignSwitch} logIn={handleLogIn} />
            : null}
        </Box>
        {/* </div>
        </Fade> */}
      </Route>
    </Switch >
  );
};

export default App