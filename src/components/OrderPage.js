// "/order"에서 배송,결제정보 입력하고 결제버튼누르는페이지.
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'

import OrderList from './OrderList'

const useStyles = makeStyles((theme) => ({
    root:{
      flexGrow: 1,
      '& > *': {
        padding: theme.spacing(1),
      },
    },
    thumbnail: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    price: {
      color: theme.palette.primary.main
    },
    formControl: {
      width: '100%',
    },
    table: {

    },
    hide: {
      display: 'none',
    },
    contentPanel: {
      
    }
}));

const OrderPage = () => {
  const classes = useStyles();

  useEffect(() => {

  }, []);

  return(
    <Grid container className={classes.root} direction="column">
      <Typography variant="h4" gutterBottom>주문상세내역</Typography>
      <OrderList edit={false} />
      <Typography variant="h6" gutterBottom>주문자 정보</Typography>
      <Divider variant="middle"/>
      <Typography variant="h6" gutterBottom>배송 정보</Typography>
      <Divider variant="middle"/>
      <Typography variant="h6" gutterBottom>결제 정보</Typography>
      <Divider variant="middle"/>
      <Typography variant="h6" gutterBottom>결제 금액: ㅁㄴㅇ원</Typography>
      <Button variant="outlined">결제하기</Button>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)