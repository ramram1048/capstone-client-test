// https://material-ui.com/components/drawers/
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { handleDrawerOpen, handleDrawerClose } from '../actions/sketchDrawer'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from '@material-ui/icons'

const drawerWidth = 560;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  },
}));

const SketchDrawer = function({drawerOpen, handleDrawerOpen, handleDrawerClose}){
  const theme = useTheme();
  const classes = useStyles();

  return(
    <Hidden smDown>
      <Drawer
        anchor="right"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {drawerOpen?<IconButton onClick={handleDrawerClose}><ChevronRightIcon /></IconButton>
          : <IconButton onClick={handleDrawerOpen}><ChevronLeftIcon /></IconButton>}
        </div>
      </Drawer>
    </Hidden>
  )
}

SketchDrawer.propTypes = {
  drawerOpen: PropTypes.bool,
}

const mapStateToProps = state => ({
  drawerOpen: state.drawerOpen,
})

const mapDispatchToProps = dispatch => ({
  handleDrawerOpen: () => dispatch(handleDrawerOpen()),
  handleDrawerClose: () => dispatch(handleDrawerClose()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SketchDrawer)