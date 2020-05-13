// "/auth"페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goBack, push } from 'connected-react-router'
import { useSnackbar } from 'notistack';


import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  AppBar,
  Avatar,
  Tab,
  Typography,
  Link,
  Grid,
  TextField,
  Button
} from '@material-ui/core'
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab'
import {
  LockOutlined
} from '@material-ui/icons'

import Cookies from 'js-cookie'

import { 
  requestLogin,
  fetchLoginStatus,
  getLoginStatus
 } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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

const AuthPage = ({redirectTo, fetchLoginStatus, loginResult, getLoginStatus, dispatchBack, dispatchPush, requestLogin}) => {
  const [ tabValue, setTabValue ] = useState("1");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   fetchLoginStatus()
  // }, [])

  // useEffect(() => {
  //     console.log(loginResult)
  //     if(loginResult === "SUCCESS"){
  //       dispatchPush(redirectTo)
  //     }
  // }, [loginResult])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const loginSubmit = (event) => {
    event.preventDefault()
    // console.log(email, password)
    requestLogin(email, password)
  }

  const loginView =
    <form
      className={classes.form}
      onSubmit={loginSubmit}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        value={email}
        onChange={(e) => (setEmail(e.target.value))}
        label="Email Address"
        autoComplete="email"
        autoFocus />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        onChange={(e) => (setPassword(e.target.value))}
        autoComplete="current-password" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        로그인
      </Button>
    </form>

  const registerView = 
    <form
      className={classes.form}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        value={email}
        onChange={(e) => (setEmail(e.target.value))}
        label="Email Address"
        autoComplete="email"
        autoFocus />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        onChange={(e) => (setPassword(e.target.value))}
        autoComplete="current-password" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        가입
      </Button>
    </form>


  return(
    <Container className={classes.root} maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        로그인
      </Typography>
      <TabContext value={tabValue} >
        <TabList onChange={handleTabChange} variant="fullWidth" aria-label="simple tabs">
          <Tab label="로그인" value="1" />
          <Tab label="회원가입" value="2" />
        </TabList>
        <TabPanel value="1">{loginView}</TabPanel>
        <TabPanel value="2">{registerView}</TabPanel>
      </TabContext>
    </Container>
  )
}

AuthPage.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    loginResult: state.auth.fetching,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchBack: () => dispatch(goBack()),
    dispatchPush: (url) => dispatch(push(url)),
    requestLogin: (email, password) => dispatch(requestLogin(email, password)),
    fetchLoginStatus: () => dispatch(fetchLoginStatus()),
    getLoginStatus: () => dispatch(getLoginStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
