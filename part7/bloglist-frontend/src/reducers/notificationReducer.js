

export const createNotification =(notification ,time) => {
  return  async (dispatch) => {
    dispatch ({ type:'SET_NOTIFICATION',notification })
    const idTimeOut=setTimeout( () => { dispatch ({ type:'CLEAR_NOTIFICATION',notification:'' })},time)
    if (idTimeOut-1>0) clearTimeout(idTimeOut-1)
  }
}

const notificationReducer = (state='',action ) => {

  switch (action.type){
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}
export default notificationReducer