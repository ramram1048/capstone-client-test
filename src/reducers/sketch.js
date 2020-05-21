const init = {
  opened: false,
  list: [],
}

const sketchReducer = (state = init, action) => {
  switch (action.type) {
    case 'SKETCH_HANDLE_DRAWER': 
      return {
        ...state,
        opened: !state.opened
      }
    case 'SKETCH_HANDLE_DRAWER_OPEN':
      return {
        ...state,
        opened: true
      }
    case 'SKETCH_HANDLE_DRAWER_CLOSE':
      return {
        ...state,
        opened: false
      }
    case 'SKETCH_ADD_ITEM': {
      const duplicate = state.list.some((item) => item === action.src)
      if(duplicate) return state
      else return {
        ...state,
        list: [...state.list, action.src]
      }
    }
    case 'SKETCH_RESET_ITEMS': 
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}

export default sketchReducer
