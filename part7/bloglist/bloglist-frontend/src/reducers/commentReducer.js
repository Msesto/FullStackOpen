import commentsService from '../services/comments'

export const initComments = (id) => {
  return async dispatch => {
    const serverComments = await commentsService.getAll(id)
    dispatch({
      type: 'INIT_COMMENTS',
      data: serverComments,
    })
  }
}

export const addComment = (newComment, id) => {
  return async dispatch => {
    const comment = await commentsService.create({ comment: newComment }, id)
    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
    })
  }
}

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS': {
      return action.data
    }
    case 'ADD_COMMENT': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}

export default commentsReducer