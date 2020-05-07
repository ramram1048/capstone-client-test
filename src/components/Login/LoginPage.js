// "/login"에서 확인하는 로그인페이지
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { push } from 'connected-react-router'
import axios from 'axios';

import { loginRequest as loginRequestAction } from '../../actions/auth';
import { useForm, Controller } from 'react-hook-form'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = ({status, loginRequest}) => {
  const classes = useStyles();
    const { control, handleSubmit } = useForm();


  const onSubmit = (data) => {
    const {email, password} = data;
    loginRequest(email, password)
    .then(() => {
        if(status === "SUCCESS"){
            // create session data
            let loginData = {
                isLoggedIn: true,
                currentUser: email,
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            console.log("로그인했음 "+email);
            return true;
        } else{
            console.log("실패요");
            return false;
        }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
          className={classes.form} 
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller as={<TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
            />} 
            name="email"
            control={control}
          />
          <Controller as={<TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />} 
            name="password"
            control={control}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

LoginPage.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    status: state.auth.login.status
})

const mapDispatchToProps = (dispatch) => ({
    loginRequest: (id, pw) => dispatch(loginRequestAction(id, pw))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
