import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { useDispatch } from 'react-redux'
import { initialzeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch=useDispatch()
  useEffect ( ()=>{   dispatch(initialzeAnecdotes())  },[dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
     <Notification/>
     <Filter/>
     <AnecdoteForm/>
     <AnecdoteList/> 
    
    </div>
  )
}
export default App