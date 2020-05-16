const init = {
    fetching: 'INIT',
    session: false,
    currentUser: '',
    currentId: -1,
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
                currentId: action.id,
            }
        case 'AUTH_LOGIN_FAILURE':
            return {
                fetching: 'FAILURE',
                session: false,
                currentUser: '',
                currentId: -1,
            }
        case 'AUTH_LOGIN_STATUS_NOT_FOUND':
            return {
                fetching: 'NOTFOUND',
                session: false,
                currentUser: '',
                currentId: -1,
            }
        case 'AUTH_LOGOUT':
            return {
                fetching: 'SUCCESS',
                session: false,
                currentUser: '',
                currentId: -1,
            }
        default:
            return state
    }
  }
  
  export default authReducer
  