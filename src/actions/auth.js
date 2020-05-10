// https://velopert.com/1967
import axios from 'axios'
import {yujinserver} from '../restfulapi'

export const loginRequest = (email, password) => {
  console.log(email, password)
  return (dispatch) => {
    dispatch(login());

  //   return axios.post('https://jsonplaceholder.typicode.com/posts', { username: email, password })
  //   .then((response) => {
  //     //succeed
  //     dispatch(loginSuccess(email));
  //   })
  //   .catch((error) => {
  //     // failed
  //     dispatch(loginFailure());
  // })
    // return axios.post('https://jsonplaceholder.typicode.com/posts', 
    // {
    //   title: email,
    //   body: password,
    //   userId: 1,
    // })
    // .then((res) => console.log(res.data))
    // .catch((err) => (console.error(err)));
    
    // return axios.post('http://172.16.100.187:8001/auth/login', 
    // {
    //   email: email,
    //   password: password,
    // }, { header: {mode: 'no-cors', credentials: 'include',}}
    // )
    
    // return axios({ method: 'POST', url: 'http://172.16.100.187:8001/auth/login', headers: {mode: 'no-cors', credentials: 'include'}, data: { email: email } })
    // .then((res) => {
    //   console.log(res)
    //   dispatch(loginSuccess(email));
    // })
    // .catch((err) => {
    //   dispatch(loginFailure());
    // });
    return fetch(yujinserver+'/auth/login', {
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Cache': 'no-cache'
      },
      credentials: 'include',
      body: JSON.stringify({
          email: email,
          password: password,
      })
    })
    .then(((res) => res.json()))
    .then((data) => {
      console.log(data);
      dispatch(loginSuccess(email));
    })
    .catch((err) => {
      dispatch(loginFailure());
    })
}}

export const login = () => ({
  type: 'AUTH_LOGIN',
})

export const loginSuccess = (email) => ({
  type: 'AUTH_LOGIN_SUCCESS',
  email
})

export const loginFailure = () => ({
  type: 'AUTH_LOGIN_FAILURE',
})