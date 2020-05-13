import Cookies from 'js-cookie'

const init = {
    fetching: 'INIT',
    session: false,
    currentUser: '',
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                ...state,
                fetching: 'FETCHING',
            }
        case 'AUTH_LOGIN_SUCCESS':
            return {
                fetching: 'SUCCESS',
                session: true,
                currentUser: action.email,
            }
        case 'AUTH_LOGIN_FAILURE':
            return {
                fetching: 'FAILURE',
                session: false,
                currentUser: '',
            }
        default:
            return state
    }
  }
  
  export default authReducer
  