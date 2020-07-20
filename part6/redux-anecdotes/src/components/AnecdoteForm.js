import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const anecdote = async (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    props.addAnecdote(content)
    props.setNotification(`You have added: "${content}"`, 5)
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

const mapDispatchToProps = {
  addAnecdote, setNotification
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm