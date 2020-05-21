export const handleDrawer = () => ({
  type: 'SKETCH_HANDLE_DRAWER',
})

export const handleDrawerOpen = () => ({
  type: 'SKETCH_HANDLE_DRAWER_OPEN',
})

export const handleDrawerClose = () => ({
  type: 'SKETCH_HANDLE_DRAWER_CLOSE',
})

export const sketchAddItem = (src) => ({
  type: 'SKETCH_ADD_ITEM', src
})

export const sketchResetItems = () => ({
  type: 'SKETCH_RESET_ITEMS'
})