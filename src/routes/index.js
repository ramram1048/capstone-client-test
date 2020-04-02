import React from 'react'
import { Route, Switch } from 'react-router'
import { CssBaseline, Container } from '@material-ui/core'
import { ThemeProvider, createMuiTheme, } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import NavBar from '../components/NavBar'
import SketchDrawer from '../components/SketchDrawer'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

const menus = [
  {component: "Hello", path: "/hello"},
  {component: "Counter", path: "/counter"}
];

const routes = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <NavBar menus={menus}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route component={NoMatch} />
      </Switch>
      <SketchDrawer />
    </Container>
  </ThemeProvider>
)

export default routes
