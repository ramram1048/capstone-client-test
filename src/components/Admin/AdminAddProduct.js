// "/admin/productupload"에서 상품등록
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { goBack, push } from 'connected-react-router'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
  ButtonBase,
  Avatar,
  GridList,
  GridListTile,
  Box,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { PhotoCamera, Cancel, Check } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import { yujinserver } from '../../restfulapi'
import AdminSubheader from './AdminSubheader'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flexGrow: 1,
    },
    imageContainer: {
      display: 'flex',
    },
    upImageButton: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    hide: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    previewImage: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    previewCancel: {
      border: "1px solid white",
      backgroundColor: "white",
      borderRadius: "50%",
      position: "absolute",
      top: '1px',
      right: '1px',
    },
    
  checked: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  }
}));

const AdminAddProduct = ({backButtonAction, dispatchPush}) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { register, control, handleSubmit } = useForm();
    const [ colorImages, setColorImages ] = useState([]);

    const handleImageInput = (event) => {
        if(colorImages.length < 6){
          if(event.target.files[0] !== undefined){
            setColorImages([...colorImages, event.target.files[0]]);
          }
        }
      }
      const removeImage = (index) => {
        const newList = [...colorImages];
        newList.splice(index, 1);
        setColorImages(newList);
      }
      const productSubmit = (data) => {
        let form = new FormData()
        colorImages.forEach((image) => {form.append("photo", image)})
        // console.log(form)
        console.log(data)
        fetch(yujinserver+"/shop/img",{
            method: "POST",
            body: form,
            credentials: 'include',
          })
          .then(
            response => response.json(),
            error => console.log(error)
          )
          .then((json) => {
            const images = json;
            console.log(images)
            const sending = JSON.stringify({
                ...data,
                photo: json
            })
            console.log(sending)
            fetch(yujinserver+"/shop/addproduct",{
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  "Content-Type": "application/json",
                  'Cache': 'no-cache'
                },
                body: JSON.stringify({
                    ...data,
                    photo: json
                }),
                credentials: 'include',
            })
            .then(
              response => response.text(),
              error => console.log(error)
            )
            .then((text) => {
                if(text === "add product success"){
                    enqueueSnackbar("성공이요",{"variant": "success"});
                    dispatchPush("/admin/order/")
                }
                else{
                    enqueueSnackbar("실패따리",{"variant": "error"});
                }
                console.log(text)
            })
          })
    }

    const imageUpload = <Grid className={classes.imageContainer}>
        {colorImages.map((image, index) => {
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
            className={classes.hide}
            id="photo"
            name="photo"
            multiple
            type="file"
            onChange={(event) => handleImageInput(event)}
        />
        <label htmlFor="photo">
        <Avatar variant="rounded" className={clsx({
            [classes.previewImage]: true,
            [classes.hide]: colorImages.length >= 6
        })}>
            <PhotoCamera />
        </Avatar>
        </label>
        {["썸네일","설명","색상1누끼","색상2누끼","색상3누끼","색상4누끼","더이상올리지마세요"][colorImages.length]}
    </Grid>

    const optionInput = {
        
    }

    
  return(
        <Container maxWidth="lg">
            <Grid container={Paper} className={classes.root}>
                <AdminSubheader />
                <Grid item container>
                    <Typography className={classes.title} gutterBottom variant="h4">관리자 올리기</Typography>
                    <Button onClick={backButtonAction}>돌아가</Button>
                </Grid>
                <Divider />
                <form onSubmit={handleSubmit(productSubmit)}>
                    <Grid container direction="column">
                        <TextField
                            inputRef={register({required: true})}
                            variant="outlined"
                            margin="normal"
                            required
                            id="productname"
                            name="productname"
                            label="상품명"
                            autoFocus
                        />
                        <TextField
                            inputRef={register({required: true})}
                            variant="outlined"
                            margin="normal"
                            required
                            id="price"
                            name="price"
                            type="number"
                            label="가격"
                        />
                        <FormControl required component="fieldset" variant="outlined">
                            <FormLabel>카테고리</FormLabel>
                            <RadioGroup row aria-label="categoryId" name="categoryId" >
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="1" control={<Radio />} label="상의" />
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="2" control={<Radio />} label="하의" />
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="3" control={<Radio />} label="신발" />
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="4" control={<Radio />} label="악세사리" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl required component="fieldset" variant="outlined">
                            <FormLabel>성별</FormLabel>
                            <RadioGroup row aria-label="gender" name="gender" >
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="M" control={<Radio />} label="남성" />
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="W" control={<Radio />} label="여성" />
                                <FormControlLabel 
                                    inputRef={register({required: true})} value="U" control={<Radio />} label="남녀공용" />
                            </RadioGroup>
                        </FormControl>
                        {[0,1,2,3].map((colorIndex) => (
                            <Box>
                            <TextField
                                inputRef={register({})}
                                variant="outlined"
                                margin="normal"
                                id="color"
                                name={"color["+colorIndex+"]"}
                                label={"색상"+(colorIndex+1)+"번"}
                            />
                            <TextField
                                inputRef={register({})}
                                variant="outlined"
                                margin="normal"
                                id="S"
                                name={"S["+colorIndex+"]"}
                                type="number"
                                label="S사이즈재고수"
                            />
                            <TextField
                                inputRef={register({})}
                                variant="outlined"
                                margin="normal"
                                id="M"
                                name={"M["+colorIndex+"]"}
                                type="number"
                                label="M사이즈재고수"
                            />
                            <TextField
                                inputRef={register({})}
                                variant="outlined"
                                margin="normal"
                                id="L"
                                name={"L["+colorIndex+"]"}
                                type="number"
                                label="L사이즈재고수"
                            />
                            <TextField
                                inputRef={register({})}
                                variant="outlined"
                                margin="normal"
                                id="XL"
                                name={"XL["+colorIndex+"]"}
                                type="number"
                                label="XL사이즈재고수"
                            />
                        </Box>
                        ))}
                        {imageUpload}
                        <Box>

                        </Box>
                        <Button type="submit" fillWidth variant="contained" color="primary">Submit</Button>
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}

AdminAddProduct.propTypes = {
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
    backButtonAction: () => dispatch(goBack()),
    dispatchPush: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)
