import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnec} from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm =()=>{    
    const dispatch= useDispatch()
    const createAnecdote= async (event)=>{
        event.preventDefault()
        if  ((event.target.content.value.length)>10 )
        {   
            const content=event.target.content.value
            dispatch(createAnec(content))
            const notification=`you add ${content}`
            event.target.content.value=''
            dispatch(createNotification(notification,5000))
            
        }else{
            const notification='anectode must be almost 10 characters'
            dispatch(createNotification(notification,5000))
        }
    }
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name='content' /></div>
          <button type='submit'>create</button>
        </form>
        </>
    )
}
export default AnecdoteForm