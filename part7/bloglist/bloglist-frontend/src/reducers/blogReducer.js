import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id
      const toVote = state.find(n => n.id === id)
      const changedBlog = {
        ...toVote,
        votes: toVote.votes + 1
      }
      return state.map(each =>
        each.id !== id ? each : changedBlog
      )
    }
    case 'ADD_BLOG': {
      const newBlog = {
        title: action.data.title,
        author: action.data.author,
        url: action.data.url
      }
      return state.concat(newBlog)
    }
    case 'INIT_BLOGS': {
      return action.data
    }
    default:
      return state
  }
}

export default blogReducer 