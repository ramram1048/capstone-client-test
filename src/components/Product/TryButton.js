// 팔로우 여부에 따라 팔로우할지 언팔로우할지 보여주는 그 버튼~
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Tooltip, IconButton, MenuItem, Menu,
} from '@material-ui/core'
import {
    Person as PersonIcon,
    PersonAdd as FollowIcon,
    PersonAddDisabled as UnfollowIcon,
    HowToReg,
    Palette,
  } from '@material-ui/icons'
import { requestFollow, requestUnfollow } from '../../actions/follow';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    follow: {
      color: theme.palette.info.main,
    },
    unfollow: {
      color: theme.palette.error.main,
    }
}));

const TryButton = ({previews}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTry = (img) => {
    console.log(img)
    enqueueSnackbar(img+"미리보기~",{variant:"success"})
    handleClose()
  }


  return(
    <React.Fragment>
      <Tooltip 
        placement="top" 
        title="코디해보기"
      >
        <IconButton 
          aria-label="try" 
          centerRipple 
          onClick={handleOpen}>
          <Palette />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        {previews !== undefined? previews.map((preview) => (
          <MenuItem onClick={() => handleTry(preview.img)}>{preview.color}</MenuItem>
        ))
        : <MenuItem onClick={handleClose}>누끼이미지가없어요~</MenuItem>}
      </Menu>
    </React.Fragment>
  )
}

TryButton.propTypes = {
  //pathname: PropTypes.string,
  //search: PropTypes.string,
  //hash: PropTypes.string,
}

const mapStateToProps = state => ({
//   sessionId: state.auth.currentId,
//   followStore: state.follow,
})

const mapDispatchToProps = (dispatch) => ({
//   requestFollow: (userId) => dispatch(requestFollow(userId)),
//   requestUnfollow: (userId) => dispatch(requestUnfollow(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TryButton)
