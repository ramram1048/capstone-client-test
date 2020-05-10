// "/product/:pid"에서 상품 상세정보 확인하는 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { cleanOrderList, pushToOrderList } from '../../actions/orderList'
import { useSnackbar } from 'notistack';

import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ButtonBase
} from '@material-ui/core'
import {
  orange
} from '@material-ui/core/colors'
import {
  Delete as DeleteIcon, Store
} from '@material-ui/icons'

import {sangminserver} from '../../restfulapi';

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
    flexGrow: 1,
  }
}));

const ProductDetailPage = ({pathname, cleanOrderList, pushToOrderList, push}) => {
  const [pid, setPid] = useState(0);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState([]);
  const [reviews, setReviews] = useState([]);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setPid(pathname.substring(pathname.lastIndexOf('/') + 1));
    //if(!pid.isInteger) return(<NoMatch/>);
    fetch(sangminserver+"/product/"+pid)
    .then(res => res.json(),
    error => {throw error},
    )
    .then(json => {
      setData(json.result[0]);
      if(json.detail.length === 0){
        setDetail([{
          selected: true, option: {id: 1, productId: pid, color: "테스트용 기본", size: "기본", cnt: 100}
        }])
      }
      else{
        setDetail(json.detail.map((option) => {
          return {
            selected: false, 
            option: option
          }
        }))
      };
      setReviews(json.rows);
    })
    .catch(error => {console.warn(error)}
  )}, [pid]);

  // useEffect(() => {
  //   console.log(detail)
  // }, [detail])

  const addList = (event, index) => {
    const newList = [...detail]
    // console.log(index, newList)
    newList[index].selected = true
    setDetail(newList);
  }

  const removeList = (event, index) => {
    const newList = [...detail];
    newList[index].selected = false
    setDetail(newList);
  }

  if(!pid || !data || !detail) return(<div>loading</div>)
  // console.log(data);
  //console.log(detail);
  // console.log(detail)
  const optionMenuItem = detail.map((option, index) => {
      return(
        <MenuItem onClick={(event) => addList(event, index)}>{option.option.color} / {option.option.size}</MenuItem>
  )})
  // const optionRow = optionArray.map((optionIdx) => {
  //   return(
  //     <TableRow>
  //       <TableCell>{detail[optionIdx].color} / {detail[optionIdx].size}</TableCell>
  //       <TableCell size="small">개수</TableCell>
  //       <TableCell size="small" align="right"><strong className={classes.price}>{data.price}</strong>원</TableCell>
  //       <TableCell size="small"><Button variant="outlined">입혀보기</Button></TableCell>
  //       <TableCell size="small"><IconButton 
  //       aria-label="delete"
  //       onClick={removeList}>
  //           <DeleteIcon />
  //         </IconButton></TableCell>
  //     </TableRow>
  //   )
  // })

  const reviewList = reviews? reviews.map((review) => {
        return(
          <Grid container component={Paper} direction="column" elevation={0}>
            <Grid item container>
                <Avatar item>{review.userId}</Avatar>
                <Box item direction="column" flexGrow={1}>
                    <Typography>{review.userId}</Typography>
                    <Typography variant="body2" color="textSecondary">언제 몇월 몇일 {review.email}</Typography>
                </Box>
                <Box item>
                    <IconButton>ㅋ</IconButton>
                    <IconButton>ㄴ</IconButton>
                    <IconButton>ㅇ</IconButton>
                    <IconButton>ㄷ</IconButton>
                </Box>
            </Grid>
              <ButtonBase item><img src={review.img} /></ButtonBase>
              <Typography item gutterBottom>{review.content}</Typography>
          </Grid>
        )
  }) : <div>ㅇㅅㅇ</div>
  
  const optionTableRow = detail.map((option, index) => {
    if(option.selected === true) return(
      <TableRow>
        <TableCell>{option.option.color} / {option.option.size}</TableCell>
        <TableCell size="small">개수</TableCell>
        <TableCell size="small" align="right"><strong className={classes.price}>{data.price}</strong>원</TableCell>
        <TableCell size="small"><Button variant="outlined">입혀보기</Button></TableCell>
        <TableCell size="small"><IconButton 
        aria-label="delete"
        onClick={(event) => removeList(event, index)}
        >
            <DeleteIcon />
          </IconButton></TableCell>
      </TableRow>
    )
  })
  
  const purchaseThis = () => {
    let optionCount = 0;
    cleanOrderList();
    detail.map((option) => {
      if(option.selected === true) {
        pushToOrderList({
          pid: option.productId, 
          pname: data.pname, 
          color: option.color, 
          size: option.size, 
          cnt: 1, 
          price: data.price, 
          img: data.img
        });
        optionCount++;
      }
    })
    if(!optionCount) {
      enqueueSnackbar("먼저 옵션을 선택해주세요.",{"variant": "error"});
    }
    else{push('/order');}
  }

  return(
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={5} className={classes.thumbnail}>
        <img src={data.img} style={{maxHeight: '500px'}}/>
      </Grid>
      <Grid item xs={12} sm={7} container>
        <Grid item container xs component={Paper} direction="column" spacing={1}>
          <Grid item xs>
            <Typography variant="subtitle1" gutterBottom>{data.seller}</Typography>
            <Typography variant="h6" gutterBottom>{data.pname}</Typography>
            <Divider variant="middle"/>
            <Typography variant="subtitle2" gutterBottom><strong className={classes.price}>{data.price}</strong>원</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value=""
                displayEmpty
                onClick={addList}
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  = 사이즈, 색상 선택 =
                </MenuItem>
                {optionMenuItem}
              </Select>
            </FormControl>
            <Table className={clsx({
              [classes.formControl]: true,
              [classes.hide] : false
              })} aria-label="spanning table">
              <TableBody>
                {optionTableRow}
                <TableRow>
                  <TableCell colSpan={3} align="right">총 합계금액</TableCell>
                  <TableCell colSpan={2} align="right"><strong className={classes.price}>얼마얼마</strong>원</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Divider variant="middle"/>
            <Button variant="outlined">입혀보기</Button>
            <Button variant="outlined">장바구니</Button>
            <Button variant="outlined" onClick={purchaseThis}>바로구매</Button>
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Paper item className={classes.contentPanel} square>
          <Typography variant="h6" gutterBottom>상품상세정보</Typography>
          <Divider variant="middle"/>
          <img src={data.description} alt={data.description} />
        </Paper>
        <Paper item className={classes.contentPanel} square>
          <Typography variant="h6" gutterBottom>리뷰</Typography>
          <Divider variant="middle"/>
          {reviewList}
        </Paper>
      </Container>
    </Grid>
  )
}

ProductDetailPage.propTypes = {
  pathname: PropTypes.string,
  //search: PropTypes.string,
  //hash: PropTypes.string,
}


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  //search: state.router.location.search,
  //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
  pushToOrderList : ({pid, pname, color, size, cnt, price, img}) => dispatch(pushToOrderList(pid, pname, color, size, cnt, price, img)),
  cleanOrderList : () => dispatch(cleanOrderList()),
  push : (path, state) => dispatch(push(path, state)),
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage)