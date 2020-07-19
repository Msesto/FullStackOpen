export const vote = (id) => {
  return {
    type: 'ADDVOTE',
    data: { id: id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADDANECDOTE',
    data: {
      content: content.content,
      id: content.id
    }
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
    default:
      return state
  }
}

export default anecdoteReducer