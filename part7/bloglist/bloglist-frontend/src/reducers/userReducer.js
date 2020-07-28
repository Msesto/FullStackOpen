import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_LIKE': {
    //   const id = action.data.id
    //   const toVote = state.find(n => n.id === id)
    //   const changedBlog = {
    //     ...toVote,
    //     likes: toVote.likes + 1
    //   }
    //   return state.map(each =>
    //     each.id !== id ? each : changedBlog
    //   )
    // }
    // case 'DELETE_BLOG': {
    //   const id = action.data.id
    //   const newArr = state.filter(each => each.id !== id)
    //   return newArr
    // }
    // case 'ADD_BLOG': {
    //   const newBlog = {
    //     ...action.data
    //   }
    //   return state.concat(newBlog)
    // }
    case 'INIT_USERS': {
      return action.data
    }
    default:
      return state
  }
}

export default userReducer 