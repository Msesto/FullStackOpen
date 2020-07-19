export const setNotification = (data, time) => {
  return async dispatch => {
    const actualTime = Number(time + '000')
    dispatch({
      type: 'SET_MESSAGE',
      message: data
    })
    setTimeout(() => {
      dispatch({
        type: 'DEL_MESSAGE'
      })
    }, actualTime)

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