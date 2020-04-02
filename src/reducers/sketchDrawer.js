const sketchDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case 'HANDLE_DRAWER_OPEN':
      return true
    case 'HANDLE_DRAWER_CLOSE':
      return false
    default:
      return false
  }
}

export default sketchDrawerReducer
