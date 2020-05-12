// https://velopert.com/1967
import axios from 'axios'
import {yujinserver} from '../restfulapi'

export const loginRequest = (email, password) => {
  return (dispatch) => {
    dispatch(login());
    return fetch(yujinserver+"/auth/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Cache': 'no-cache'
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if(data.name) dispatch(loginSuccess(data.name));
      else dispatch(loginFailure());
    })
    .catch((err) => {
      dispatch(loginFailure());
    })
  }
}

export const login = () => ({
  type: 'AUTH_LOGIN',
})

export const loginSuccess = (name) => ({
  type: 'AUTH_LOGIN_SUCCESS', name
})

export const loginFailure = () => ({
  type: 'AUTH_LOGIN_FAILURE',
})