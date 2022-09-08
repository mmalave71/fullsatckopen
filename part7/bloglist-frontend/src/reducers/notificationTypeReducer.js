export const setTypeNotification =(typeNotification ) => {
  return ({ type:'SET_TYPE_NOTIFICATION',typeNotification })
}

const notificationTypeReducer =( state='SUCESSFULL',action ) => {

  switch(action.type) {
  case 'SET_TYPE_NOTIFICATION': return action.typeNotification
  default: return state
  }
}
export default notificationTypeReducer