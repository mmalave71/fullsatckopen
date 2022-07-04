export const filterChange =(filter)=>{
    return { type:'SET_FILTER', filter}
}
const reducer=(state='',action)=>{
    //console.log('action in filter',action)
    switch (action.type) {
        case 'SET_FILTER': return action.filter
        default: return state      
    }
}
export default reducer