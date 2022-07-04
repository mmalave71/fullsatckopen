import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props)=>{
    const vote = async(anecdote) => {
        props.addVote(anecdote)
        const notification=`you voted  ${anecdote.content}`
        props.createNotification(notification,5000)
      }
    const getAnecdotes=()=>{
              if (props.filter==='') { return props.anecdotes }
              return  props.anecdotes.filter(anecdote=>RegExp(props.filter,'gi').test(anecdote.content))
    }  
    const anecdotes=getAnecdotes()
    const anecdotesToShow = anecdotes.sort((a,b)=> a.votes>b.votes?-1:1)
    return (
        <>
        {anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </>
    )

}
const mapStateToProps = (state) => {
  return {
          anecdotes:state.anecdotes,
          filter:state.filter
    }
  }    
const mapDispatchToProps={  addVote, createNotification}  
const AnecdoteListConected=connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default AnecdoteListConected