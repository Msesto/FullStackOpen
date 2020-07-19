export const setMessage = (data) => {
  return {
    type: 'SET_MESSAGE',
    message: data
  }
}

export const delMessage = (confirm) => {
  if (confirm === 'del') {
    return {
      type: 'DEL_MESSAGE',
    }
  }
}

const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      state = action.message
      return state
    case 'DEL_MESSAGE':
      state = ''
      return state
    default:
      return state
  }
}

export default messageReducer