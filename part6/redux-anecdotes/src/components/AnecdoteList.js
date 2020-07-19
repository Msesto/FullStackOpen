import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage, delMessage } from '../reducers/messageReducer'


const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes.filter(ea => ea.content.includes(state.filter)).sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const toVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setMessage(`You have voted for: "${anecdote.content}"`))
    setTimeout(() => { dispatch(delMessage('del')) }, 5000)
  }


  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => toVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )


}

export default AnecdoteList