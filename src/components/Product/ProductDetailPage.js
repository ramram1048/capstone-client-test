// "/product/:pid"에서 상품 상세정보 확인하는 페이지
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { cleanOrderList, pushToOrderList } from '../../actions/orderList'
import { useSnackbar } from 'notistack';

import clsx from "clsx";
import axios from 'axios';
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
  ButtonBase,
  TextField,
  Icon,
} from '@material-ui/core'
import {
  orange
} from '@material-ui/core/colors'
import {
  Delete as DeleteIcon, Store, PhotoCamera, Cancel
} from '@material-ui/icons'

import ReviewCard from './ReviewCard';
import {sangminserver} from '../../restfulapi';
import { useForm, Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow: 1,
  },
  imageAvatar: {
    width: 'auto',
    height: 'auto',
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
  },
  imageContainer: {
    display: 'flex',
  },
  upImageButton: {
      width: theme.spacing(20),
      height: theme.spacing(20),
  },
  input: {
      display: 'none',
  },
  previewImage: {
      width: theme.spacing(20),
      height: theme.spacing(20),
  },
  previewCancel: {
    position: "absolute",
    top: '0',
    right: '0',
  }
}));

const ProductDetailPage = ({pathname, cleanOrderList, pushToOrderList, push}) => {
  const [pid, setPid] = useState(0);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [ images, setImages ] = useState([]);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    setPid(pathname.substring(pathname.lastIndexOf('/') + 1));
    //if(!pid.isInteger) return(<NoMatch/>);
    fetch(sangminserver+"/product/"+pid, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(json => {
      setData(json.selected_product[0]);
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
      setReviews(json.reviews);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if(pid === 0 || !data || !detail) return(<div>loading</div>)
  // console.log(data);
  //console.log(detail);
  // console.log(detail)
  const optionMenuItem = detail.map((option, index) => {
      return(
        <MenuItem onClick={(event) => addList(event, index)}>{option.option.color} / {option.option.size}</MenuItem>
  )})

  const reviewList = reviews.length? reviews.map((review) => {
        return(
          <ReviewCard review={review} />
        )
  }) : <Typography variant="h4" alignment="center" gutterBottom>리뷰가 없어요</Typography>
  
  const optionTableRow = detail.map((option, index) => {
    // console.log(option)
    if(option.selected === true) return(
      <TableRow>
        <TableCell size="small"><IconButton 
        aria-label="delete"
        onClick={(event) => removeList(event, index)}
        >
          <DeleteIcon />
        </IconButton></TableCell>
        <TableCell><Typography gutterBottom>{option.option.color} / {option.option.size}</Typography></TableCell>
        <TableCell size="small"><Typography gutterBottom><TextField 
          defaultValue={1}
          type="number"
          placeholder="개수"
          inputProps={{ min: "1", max: "100", step: "1"}}
        />개
          </Typography></TableCell>
        <TableCell size="small" align="right"><strong className={classes.price}>{data.price}</strong>원</TableCell>
        <TableCell size="small"><Button variant="outlined">입혀보기</Button></TableCell>
      </TableRow>
    )
  })
  
  const purchaseThis = () => {
    let optionCount = 0;
    cleanOrderList();
    detail.map((option, index) => {
      if(option.selected === true) {
        pushToOrderList({
          pid: pid, 
          pname: data.pname, 
          color: option.option.color, 
          size: option.option.size, 
          quantity: 1,
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
  const handleImageInput = (event) => {
    if(images.length < 3){
      if(event.target.files[0] !== undefined){
        setImages([...images, event.target.files[0]]);
      }
    }
  }
  const removeImage = (index) => {
    const newList = [...images];
    newList.splice(index, 1);
    setImages(newList);
  }
  const reviewSubmit = (data) => {
    // console.log(data.content, images)
    let form = new FormData()
    form.append("productid", pid)
    form.append("content", data.content)
    form.append("user", [{id: "3"}])
    images.forEach((image) => {form.append("photo", image)})
    console.log(form.keys())
    axios.post(sangminserver+"/review",form)
    .then(response => console.log(response))
    .catch(error => console.error(error))
  }

  const reviewWriteForm = <Box className={clsx({
      [classes.hide]: !expanded
    })}>
      <form onSubmit={handleSubmit(reviewSubmit)}>
        <Controller as={<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="내용"
            multiline
            rows={12}
            />}
            name="content"
            control={control}
            />
        {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            name="content"
            label="내용"
            multiline
            rows={12}
            /> */}
        <Grid className={classes.imageContainer}>
            {images.map((image, index) => {
                return(
                  <React.Fragment>
                    <ButtonBase variant="rounded">
                      <Avatar src={URL.createObjectURL(image)} 
                          variant="rounded"
                          className={classes.previewImage}
                      />
                    </ButtonBase>
                    <ButtonBase onClick={() => removeImage(index)}>
                      <Cancel className={classes.previewCancel}/>
                    </ButtonBase>
                  </React.Fragment>
                )
            })}
            <input 
                accpet="image/*"
                className={classes.input}
                id="icon-button-file"
                name="photo"
                multiple
                type="file"
                onChange={(event) => handleImageInput(event)}
            />
            <label htmlFor="icon-button-file">
              <Avatar variant="rounded" className={clsx({
                [classes.previewImage]: true,
                [classes.hide]: images.length >= 3
              })}>
                  <PhotoCamera />
              </Avatar>
            </label>
        </Grid>
        <Button type="submit" fillWidth variant="contained" color="primary">Submit</Button>
    </form>
    </Box>

  return(
    <Grid container className={classes.root}>
      <Grid item sm={12} md={5}>
        <Avatar src={data.img} 
          variant="square"
          className={classes.imageAvatar}
        />
      </Grid>
      <Grid item sm={12} md={7} container>
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
      <Grid xs={12}>
        <Paper item className={classes.contentPanel} square>
          <Typography variant="h6" gutterBottom>상품상세정보</Typography>
          <Divider variant="middle"/>
          <Avatar src={data.description} 
            variant="square"
            className={classes.imageAvatar}
            alt={data.description}
          />
        </Paper>
        <Paper item className={classes.contentPanel} square>
          <Grid container>
            <Typography flexGrow={1} variant="h6" gutterBottom>리뷰</Typography>
            <Button onClick={handleExpandClick}>리뷰 쓰기</Button>
          </Grid>
          {reviewWriteForm}
          <Divider variant="middle"/>
          <Grid container>
            {reviewList}
          </Grid>
        </Paper>
      </Grid>
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
  pushToOrderList : (order) => dispatch(pushToOrderList(order)),
  cleanOrderList : () => dispatch(cleanOrderList()),
  push : (path, state) => dispatch(push(path, state)),
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage)