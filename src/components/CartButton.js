// pid, color, size, count
// 보내는 버튼.
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Button
} from '@material-ui/core'
import { increment, decrement } from '../actions/orderList'


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

const CartButton = ({pid, color, size, cnt}) => {
    const classes = useStyles();

    useEffect(() => {

    }, []);

    return(
        <Button onClick={}>
            장바구니
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    pushToOrderList : ({pid, color, size, cnt}) => dispatch(pushToOrderList(pid, color, size, cnt))
})

export default connect(mapDispatchToProps)(CartButton)