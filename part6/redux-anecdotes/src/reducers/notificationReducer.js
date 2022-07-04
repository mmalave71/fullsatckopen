export const createNotification = (notification,time)=>{
    return async dispatch =>{
        dispatch ({type:'SET_NOTIFICATION',notification})
        const idTimeout=setTimeout(()=>{ dispatch ({type:'CLEAR_NOTIFICATION',notification})},5000)
          if ((idTimeout-1)>0) {clearTimeout(idTimeout-1)}
    }
}
const reducer = (state='Notifications here', action) =>{
    switch(action.type ) {
        case 'SET_NOTIFICATION' : return action.notification
        case 'CLEAR_NOTIFICATION': return ''
        default: return state
    }
}
export default reducer