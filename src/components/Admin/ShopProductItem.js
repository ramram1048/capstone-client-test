

// "/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, 
  Avatar, 
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core'
import { yujinserver } from '../../restfulapi';
import AdminSubheader from './AdminSubheader';
import OrderList from './OrderList';

const useStyles = makeStyles((theme) => ({

}));

const ShopProductItem = ({product, options, previews}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  
  return(
    <React.Fragment>
      <Box display="flex" alignItems="center" p={1}>
        <Avatar src={product.img} variant="rounded" />
        <Typography gutterBottom variant="body1">{product.pname}</Typography>
        <Typography gutterBottom variant="body2">{product.price}원</Typography>
        <Button onClick={handleOpen}>재고 수정</Button>
      </Box>
      <Dialog 
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="design-write-dialog"
      >
        <DialogTitle>상품정보 수정</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>재고 수정하세요</Typography>
          {options.map((option) => {
            return(
              <Box display="flex" alignItems="center" p={1}>
                <Avatar src={(previews.find((preview) => preview.color === option.color)).img} variant="rounded" />
                <Box flexGrow={1} component={Typography} gutterBottom variant="body1">{option.color} / {option.size}:</Box>
                <Typography gutterBottom variant="body1" align="right">{option.cnt}개 → </Typography>
                <TextField 
                size="small" 
                className={classes.textFieldQuantity}
                type="number"
                defaultValue={option.cnt}
                inputProps={{
                    style: { textAlign: "right" },
                    min: "1", max: "10000", step: "1",
                }}
                />
              </Box>
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          {/* <Button onClick={submitDesign}>공유하기</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

ShopProductItem.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductItem)
