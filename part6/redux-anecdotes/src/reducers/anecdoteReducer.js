import anecdoteService from "../services/anecdote"

export const addVote= (anecdote)=>{
  return async dispatch=>{
    const objAnecdote={...anecdote,votes:anecdote.votes+1}
    const anecdoteUpdated= await anecdoteService.update(objAnecdote.id,objAnecdote)  
    dispatch ({ type:'VOTE', data:anecdoteUpdated }) 
  }
}
export const createAnec = (content)=>{
  return async dispatch =>{
    const objAnecdote={ content ,votes:0}
    const anecdote= await anecdoteService.create(objAnecdote)
    dispatch ({type:'CREATE',data:anecdote })  
  }
}
export const initialzeAnecdotes =()=>{
  return async dispatch =>{
    const anecdotes= await anecdoteService.getAll()
    dispatch({ type:'INITIALIZE', data:anecdotes})
  }
}
const reducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE':{                    
                    const id=action.data.id
                    const anecdoteUpdated=action.data
                    return state.map(anecdote=> (anecdote.id===id)? anecdoteUpdated:anecdote)
                 }
    case 'CREATE':{
                    const newAnecdote=action.data 
                    return [...state,newAnecdote]
                  }         
    case 'INITIALIZE': return action.data                  
   default:  return state
  }
}
export default reducer