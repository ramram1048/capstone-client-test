// "/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Container,
} from '@material-ui/core'
import { yujinserver } from '../../restfulapi';
import AdminSubheader from './AdminSubheader';
import OrderList from './OrderList';

const useStyles = makeStyles((theme) => ({

}));

const AdminOrders = ({}) => {
  const classes = useStyles();
  const [orderList, setOrderList] = useState(null)

  useEffect(() => {
    fetch(yujinserver+'/shop/orders',{
      credentials: 'include',
    })
    .then(
      (res) => res.json(),
      (error) => console.log(error)
    )
    .then((data) => {
      console.log(data)
      setOrderList(<OrderList orders={data} variant="shop" />)
    })
  }, [])

  return(
    <Container maxWidth="md">
      <AdminSubheader />
      {orderList}
    </Container>
  )
}

AdminOrders.propTypes = {
  //pathname: PropTypes.string,
  //search: PropTypes.string,
  //hash: PropTypes.string,
}


const mapStateToProps = state => ({
  //pathname: state.router.location.pathname,
  //search: state.router.location.search,
  //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
