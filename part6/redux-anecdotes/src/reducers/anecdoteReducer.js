import anecdotesService from '../services/anecdotes'

export const vote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdotesService.updateVote(anecdote)
    dispatch(
      {
        type: 'ADDVOTE',
        data: { id: updated.id }
      }
    )
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADDANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADDVOTE': {
      const id = action.data.id
      const toVote = state.find(n => n.id === id)
      const changedNote = {
        ...toVote,
        votes: toVote.votes + 1
      }
      return state.map(each =>
        each.id !== id ? each : changedNote
      )
    }
    case 'ADDANECDOTE': {
      const newAnecdote = {
        content: action.data.content,
        id: action.data.id,
        votes: 0
      }
      return state.concat(newAnecdote)
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export default anecdoteReducer