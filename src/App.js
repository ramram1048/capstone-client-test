import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter, push } from 'connected-react-router'
import routes from './routes'
import { connect } from 'react-redux'

import NavBar from './components/Header/NavBar'
import SketchDrawer from './components/SketchDrawer'
import AuthPage from './components/Auth/AuthPage'
import { SnackbarProvider } from 'notistack'

import { CssBaseline, Grid, Container, Box, Button } from '@material-ui/core'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { red, amber } from '@material-ui/core/colors'
import { handleDrawerOpen } from './actions/sketchDrawer'
import { 
  fetchLoginStatus,
  getLoginStatus } from './actions/auth'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
    secondary: {
      main: amber.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100vh',
    alignItems: 'stretch',
    overflow: "hidden",
  },
  main: {
    display: 'flex',
    flex: "1 1 auto",
    flexDirection: "column"
  },
  context: {
    padding: theme.spacing(1),
    overflowY: "auto",
    height: 0,
  },
  drawer: {
    flex: "0 0 auto"
  }
}));

const menus = [
  {component: "상의", path: "/productList?category=1"},
  {component: "하의", path: "/productList?category=2"},
  {component: "신발", path: "/productList?category=3"},
  {component: "패션잡화", path: "/productList?category=4"},
  {component: "나의옷장", path: "/closet"},
  {component: "추천코디", path: "/design"},
  {component: "패션케어커뮤니티", path: "/community"},
  // {component: "Hello", path: "/hello"},
  // {component: "Counter", path: "/counter"},
  // {component: "Login", path: "/login"},
];

const App = ({ history, pathname, loginFetching, loginSession, fetchLoginStatus, dispatchPush }) => {
  const classes = useStyles();
//   useEffect(() => {
//     fetchLoginStatus().then(() => {
//       console.log(getLoginStatus())
//       if(getLoginStatus().fetching !== "SUCCESS"){
//           dispatchPush("/auth")
//           return (<div>좀기다리셈</div>)
//       }
//     })
// }, [])
  useEffect(() => {
    while(loginFetching !== 'FETCHING'){
      fetchLoginStatus()
      break
    }
  }, [pathname])

  return (
    <ConnectedRouter history={history} noInitialPop>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.root}>
          <CssBaseline />
          <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Grid container item className={classes.main}>
            <NavBar menus={menus}/>
            <Box flex="1 1 auto" className={classes.context}>
              { loginSession?routes:<AuthPage /> }
            </Box>
          </Grid>
          <Grid item className={classes.drawer}>
            <SketchDrawer />
          </Grid>
          </SnackbarProvider>
        </Grid>
      </ThemeProvider>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  loginFetching: state.auth.fetching,
  loginSession: state.auth.session,
})

const mapDispatchToProps = dispatch => ({
  dispatchPush: (url) => dispatch(push(url)),
  fetchLoginStatus: () => dispatch(fetchLoginStatus()),
  getLoginStatus: () => dispatch(getLoginStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
