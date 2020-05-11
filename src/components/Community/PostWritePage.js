// "/community/write"에서 커뮤니티 글쓰는페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { goBack } from 'connected-react-router'

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
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flexGrow: 1,
    },
    content: {
        height: "100px",
    },
    upImageButton: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    input: {
        display: 'none',
    },
    previewImage: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

const PostWritePage = ({backButtonAction}) => {
    const classes = useStyles();
    const [ images, setImages ] = useState([]);
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const {title, content} = data;
    }
    const handleImageInput = (event) => {
        setImages([...images, event.target.files[0]]);
    }

    

    return(
        <Container maxWidth="lg">
            <Grid container={Paper} className={classes.root}>
                <Grid item container>
                    <Typography className={classes.title} gutterBottom variant="h4">글쓰기</Typography>
                    <Button onClick={backButtonAction}>돌아가</Button>
                </Grid>
                <Divider />
                <form>
                    <Controller as={<TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="제목"
                        autoComplete="title"
                        autoFocus
                        />} 
                        name="title"
                        control={control}
                    />
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
                    <Grid>
                        {images.map((image) => {
                            return(
                                // <ButtonBase className={classes.image}
                                //     style={{width: "100%"}}>
                                // <span 
                                // style={{background: URL.createObjectURL(image)}} />
                                // </ButtonBase>
                                <Avatar src={URL.createObjectURL(image)} 
                                    variant="rounded"
                                    className={classes.previewImage}
                                />
                            )
                        })}
                        <input 
                            accpet="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            multiple
                            type="file"
                            onChange={handleImageInput}
                        />
                        <ButtonBase htmlFor="icon-button-file">
                            {/* <Button component="span" color="primary" variant="outlined" className={classes.upImageButton}>
                                <PhotoCamera />
                            </Button> */}
                            <Avatar variant="rounded" className={classes.previewImage}>
                                <PhotoCamera />
                            </Avatar>
                        </ButtonBase>
                    </Grid>
                    <Button type="submit" fillWidth variant="contained" color="primary">Submit</Button>
                </form>
            </Grid>
        </Container>
    )
}

PostWritePage.propTypes = {
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
    backButtonAction: () => dispatch(goBack())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostWritePage)
