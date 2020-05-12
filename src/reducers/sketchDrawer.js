const sketchDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case 'HANDLE_DRAWER':
      return !state
    // case 'HANDLE_DRAWER_OPEN':
    //   return true
    // case 'HANDLE_DRAWER_CLOSE':
    //   return false
    default:
      return state
  }
}

export default sketchDrawerReducer
