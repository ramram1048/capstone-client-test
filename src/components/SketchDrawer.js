// https://material-ui.com/components/drawers/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { connect } from 'react-redux'
// import { handleDrawer } from '../actions/sketch'
import Scatch from './Scatch'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Box,
  SwipeableDrawer,
  Button,
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
import SketchComponent from './Sketch/SketchComponent'

const drawerWidth = 560;

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "0 0 auto",
    width: drawerWidth,
    transition: "all 0.2s ease-in-out",
  },
  closed: {
    marginRight: -(drawerWidth),
    opacity: 0,
  }
}));

const SketchDrawer = function({drawerOpen, handleDrawer}){
  const theme = useTheme();
  const classes = useStyles();

  // useEffect(() => {
  //   console.log(drawerOpen)
  // }, [drawerOpen])

  return(
    <Box className={clsx({
      [classes.root]: true,
      [classes.closed]: !drawerOpen
    })}>
        <Box flex="1 1 auto">
          {/* <SketchComponent /> */}
          <Scatch />
        </Box>
    </Box>
  )
}

SketchDrawer.propTypes = {
  drawerOpen: PropTypes.bool,
}

const mapStateToProps = state => ({
  drawerOpen: state.sketch.opened,
})

const mapDispatchToProps = dispatch => ({
  handleDrawer: () => dispatch(handleDrawer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SketchDrawer)