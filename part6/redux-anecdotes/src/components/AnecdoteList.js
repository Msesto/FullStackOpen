import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
import { connect } from 'react-redux'



const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter(ea => ea.content.includes(props.filter)).sort((a, b) => b.votes - a.votes)

  const toVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  vote, setNotification
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedList


