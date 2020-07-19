import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, delMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const anecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setMessage(`You have added: "${content}"`))
    setTimeout(() => { dispatch(delMessage('del')) }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={anecdote}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )

}

export default AnecdoteForm