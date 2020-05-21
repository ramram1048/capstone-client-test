import React from 'react'
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box,
  AppBar, Toolbar, IconButton, Link, Typography,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import { Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@material-ui/icons'
import { requestLogout } from '../../actions/auth'
import { handleDrawer } from '../../actions/sketch';
import {yujinserver} from '../../restfulapi'
import { push } from 'connected-react-router';
import ProductSearchBar from '../Product/ProductSearchBar';

const useStyles = makeStyles((theme) => ({
  topbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.primary.light
  },
  toolbarSecondary: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  actionBox: {
    '& > *': {
      padding: theme.spacing(1)
    }
  }
}));

const NavBar = ({menus, handleDrawer, requestLogout, push }) => {
  const classes = useStyles();


  const handleLogout = () => {
    requestLogout()
    push("/")
  }

  return(
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Box className={classes.topbar} alignItems="center">
        <Box className={classes.actionBox}>
        <Link onClick={handleLogout} color="inherit" >로그아웃</Link>
        <Link onClick={() => push("/order/cart")} color="inherit" >장바구니</Link>
        <Link onClick={() => {push("/order/myorder")}} color="inherit" >마이페이지</Link>

        </Box>
        <Box display="flex" flexDirection="row">
          <ProductSearchBar />
          <Button variant="outlined" size="small" onClick={() => handleDrawer()}>
            툴바열어요
          </Button>
        </Box>
      </Box>
      <Toolbar className={classes.toolbar}>  
        <Link component={RouterLink} to="/"
              color="inherit"
              noWrap >
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
            >
            멋쟁이마당
            </Typography>
          </Link>
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
  requestLogout: () => dispatch(requestLogout()),
  push: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)