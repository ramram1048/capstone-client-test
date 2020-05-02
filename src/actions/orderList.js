export const pushToOrderList = (pid, pname, color, size, cnt, price, img) => ({
  type: 'PUSH_TO_ORDER_LIST',
  pid, pname, color, size, cnt, price, img,
})

export const cleanOrderList = () => ({
  type: 'CLEAN_ORDER_LIST',
})