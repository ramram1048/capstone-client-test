import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import { connect } from 'react-redux'

import NavBar from './components/Header/NavBar'
import SketchDrawer from './components/SketchDrawer'
import { SnackbarProvider } from 'notistack'

import { CssBaseline, Grid, Container, Box, Button } from '@material-ui/core'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { red, amber } from '@material-ui/core/colors'
import { handleDrawerOpen } from './actions/sketchDrawer'

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

const App = ({ history, handleDrawerOpen }) => {
  const classes = useStyles();

  return (
    <ConnectedRouter history={history} noInitialPop>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.root}>
          <CssBaseline />
          <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Grid container item className={classes.main}>
            <NavBar menus={menus}/>
            <Box flex="1 1 auto" className={classes.context}>
              { routes }
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
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
