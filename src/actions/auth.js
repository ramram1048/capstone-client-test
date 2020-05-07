// https://velopert.com/1967
import axios from 'axios'

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
    return axios.post('https://jsonplaceholder.typicode.com/posts', 
    {
      title: email,
      body: password,
      userId: 1,
    })
    .then((res) => console.log(res.data))
    .catch((err) => (console.error(err)));
}}

export const login = () => ({
  type: 'AUTH_LOGIN',
})

export const loginSuccess = (username) => ({
  type: 'AUTH_LOGIN_SUCCESS',
  username
})

export const loginFailure = () => ({
  type: 'AUTH_LOGIN_FAILURE',
})