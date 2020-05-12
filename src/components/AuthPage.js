// "/auth"페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goBack, push } from 'connected-react-router'

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Tab,
} from '@material-ui/core'
import {
    TabContext,
    TabList,
    TabPanel
} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  context: {
    verticalAlign: 'middle',
  }
}));

const AuthPage = ({isLoggedIn, dispatchBack}) => {
  const [ tabValue, setTabValue ] = useState("1");
  const classes = useStyles();

  useEffect(() => {
    if(isLoggedIn){
      if(history.length > 1){ dispatchBack() }
      else{ dispatchPush("") }
    }
  }, [isLoggedIn])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return(
    <Container className={classes.root} maxWidth="xs">
      <TabContext value={tabValue} >
        <TabList onChange={handleTabChange} aria-label="simple tabs">
          <Tab label="로그인" value="1" />
          <Tab label="회원가입" value="2" />
        </TabList>
        <TabPanel value="1">Login view</TabPanel>
        <TabPanel value="2">Register view</TabPanel>
      </TabContext>
    </Container>
  )
}

AuthPage.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    isLoggedIn: state.auth.status.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchBack: () => dispatch(goBack()),
    dispatchPush: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
