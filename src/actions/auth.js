// https://velopert.com/1967
import {yujinserver} from '../restfulapi'
import { designInitialization } from './design'
import { followInitialization } from './follow'

export const requestLogin = (email, password) => {
  return (dispatch) => {
    dispatch(login());
    return fetch(yujinserver+"/auth/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Cache': 'no-cache'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include',
    })
    .then(
      res => res.json(),
      err => {console.log(err); dispatch(loginFailure())}
    )
    .then((data) => {
      if(data.loginStatus) {
        dispatch(designInitialization())
        dispatch(followInitialization())
        dispatch(loginSuccess(data.name))
      }
      else dispatch(loginFailure());
    })
  }
}

export const fetchLoginStatus = () => {
  return (dispatch) => {
    dispatch(login());
    return fetch(yujinserver+"/auth/status", {
      credentials: 'include',
    })
    .then(
      res => res.json(),
      err => {console.log(err); dispatch(loginFailure())}
    )
    .then(json => {
      if(json.loginStatus) dispatch(loginSuccess(json.name))
      else dispatch(loginFailure())
    })
  }
}

export const requestLogout = () => {
  return (dispatch) => {
    dispatch(login());
    return fetch((yujinserver+"/auth/logout"), {
      credentials: 'include',
    })
    .then(
      res => res.json(),
      err => {console.log(err); dispatch(loginFailure())}
    )
    .then(json => {
      if(json.loginStatus){
        dispatch(designInitialization())
        dispatch(followInitialization())
        dispatch(logoutSuccess())
      }
      else dispatch(loginFailure())
    })
  }
}

export const getLoginStatus = () => ({
  type: 'AUTH_LOGIN_STATUS',
})

export const login = () => ({
  type: 'AUTH_LOGIN',
})

export const loginSuccess = (name) => ({
  type: 'AUTH_LOGIN_SUCCESS', name
})

export const loginFailure = () => ({
  type: 'AUTH_LOGIN_FAILURE',
})

export const logoutSuccess = () => ({
  type: 'AUTH_LOGOUT_FAILURE',
})