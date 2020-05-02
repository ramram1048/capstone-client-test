const orderListReducer = (state = [], action) => {
    switch (action.type) {
      case 'PUSH_TO_ORDER_LIST': 
        return [...state, {
          pid: action.pid,
          pname: action.pname,
          color: action.color,
          size: action.size,
          cnt: action.cnt,
          price: action.price,
          img: action.img,
        }];  
      case 'CLEAN_ORDER_LIST':
        return []
      default:
        return state
    }
  }
  
  export default orderListReducer
  