import React from 'react'
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box,
  AppBar, Toolbar, IconButton, Link, Typography,
  Button,
} from '@material-ui/core'
import { Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@material-ui/icons'
import { requestLogout } from '../../actions/auth'
import { handleDrawer } from '../../actions/sketchDrawer';
import {yujinserver} from '../../restfulapi'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const NavBar = ({menus, handleDrawer, requestLogout}) => {
  const classes = useStyles();


  const handleLogout = () => {
    requestLogout()
  }

  return(
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Button onClick={handleLogout}>로그아웃</Button>
        <Link component={RouterLink} to="/"
            color="inherit"
            noWrap>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
          >
          멋쟁이마당
          </Typography>
        </Link>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small" onClick={handleDrawer}>
            툴바열어요
          </Button>
        </Box>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
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
  menus: PropTypes.array,
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  handleDrawer: () => dispatch(handleDrawer()),
  requestLogout: () => dispatch(requestLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)