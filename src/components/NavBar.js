import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { Toolbar, Link } from '@material-ui/core'

import { handleDrawerOpen } from '../actions/sketchDrawer'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  /*topbar: {
    justifyContent: 'flex-end',
    overflowX: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },*/
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

const NavBar = function({menus}){
  const classes = useStyles();

  return(
    <Toolbar className={classes.appBar}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Link component={RouterLink} to="/">Home</Link>
      {menus.map(({component, path}) => (
        <Link component={RouterLink} to={path}>{component}</Link>
      ))}
    </Toolbar>
  )
}

export default NavBar