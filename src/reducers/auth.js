const init = {
    login: {
        status: 'INIT',
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    },
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                ...state,
                login: {
                    status: 'WAITING',
                }
            }
        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                login: {
                    status: 'SUCCESS',
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.email,
                }
            }
        case 'AUTH_LOGIN_FAILURE':
            return {
                ...state,
                login: {
                    status: 'FAILURE',
                },
                // status: {
                //     ...state.status,
                //     isLoggedIn: true,
                //     currentUser: action.username,
                // }
            }
        default:
            return state
    }
  }
  
  export default authReducer
  