import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import {AlertBox} from '../components';
import { shouldForwardProp } from '@mui/styled-engine';

/*
FIXME:
- Alert close button not working
- abnormal behavior when clicking submit button

TODO:

*/




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit" >
        Jello       
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const initialState = {
  name:'',
  email:'',
  password:'',
  isMember: true
}

const registered = false;


function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [values, setValues] = useState(initialState);
  const [isRegistered, setIsRegistered] = useState(registered);
  const toggleMember = () => {
    setValues({...values,isMember:!values.isMember});
  }

  const showAlert = () => {
    setIsRegistered(true);
    new Promise(r => setTimeout(r, 3000))
    .then(() => {
      setIsRegistered(false);
    });
    setIsRegistered(false);
    
  }
  const onSubmit = () => {
    showAlert();
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?city,night)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {values.isMember?'Sign in':'Sign up'}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {!values.isMember && <TextField
                margin="normal"
                required
                fullWidth
                name="Name"
                label="Name"
                type="text"
                id="name"
                autoComplete="name"
              />}
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {values.isMember && <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />}

              {!values.isMember && <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
              />}
              {!values.isMember && <TextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeatPassword"
              />}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button 
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {values.isMember?'Sign In':'Sign Up'}
              </Button>
              <Grid container>
              {values.isMember && <><Grid item xs>
                   <Link to="/">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                <Link to="/signin" onClick={toggleMember}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              </>
                }
                {!values.isMember && <Grid item>
                  <Link to="/signin" onClick={toggleMember}>
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {isRegistered && <AlertBox 
                        severity="success"
                        alertTitle="Success"
                         description="Successfully Registered"
                         isClosed={isRegistered}
                        setClosed={setIsRegistered} />}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn