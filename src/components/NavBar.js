import React from 'react'
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Link, Typography,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core'
import { Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: '100%',
    justifyContent: 'flex-end',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  menuButton: {
    margin: theme.spacing(1),
  },
}));

const NavBar = ({menus}) => {
  const classes = useStyles();
  return(
    <AppBar position="static">
        <Toolbar
          component="nav" 
          variant="dense"
          className={classes.toolbar}>
            <Link component={RouterLink} to="/"
                color="inherit"
                noWrap
                variant="body2"
                className={classes.toolbarLink}>
                Home
            </Link>
            {menus.map(({component, path}) => (
                <Link component={RouterLink} to={path}
                color="inherit"
                noWrap
                variant="body2"
                className={classes.toolbarLink}>{component}</Link>
            ))}
        
        </Toolbar>
    </AppBar>
  )
}

NavBar.propTypes = {
  menus: PropTypes.object,
}

export default NavBar