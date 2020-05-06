import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

import NavBar from './components/NavBar'
import SketchDrawer from './components/SketchDrawer'
import { SnackbarProvider } from 'notistack'

import { CssBaseline, Container } from '@material-ui/core'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { red, amber } from '@material-ui/core/colors'

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
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  context: {
    paddingTop: theme.spacing(3),
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
  {component: "Hello", path: "/hello"},
  {component: "Counter", path: "/counter"},
  {component: "Login", path: "/login"},
];

const App = ({ history }) => {
  const classes = useStyles();

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Container className={classes.content} maxWidth="lg">
            
            <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
              <NavBar menus={menus}/>
              <Container className={classes.context}>
                { routes }
              </Container>
            </SnackbarProvider>
          </Container>
          <SketchDrawer />
        </div>
      </ThemeProvider>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
