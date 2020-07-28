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

export const likeBlog = (blog, id) => {
  return async dispatch => {
    await blogService.update(blog, id)
    dispatch(
      {
        type: 'ADD_LIKE',
        data: { id: id }
      }
    )
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deletion(id)
    dispatch(
      {
        type: 'DELETE_BLOG',
        data: { id: id }
      }
    )
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log(newBlog)
    dispatch(
      {
        type: 'ADD_BLOG',
        data: { ...newBlog }
      }
    )
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIKE': {
      const id = action.data.id
      const toVote = state.find(n => n.id === id)
      const changedBlog = {
        ...toVote,
        likes: toVote.likes + 1
      }
      return state.map(each =>
        each.id !== id ? each : changedBlog
      )
    }
    case 'DELETE_BLOG': {
      const id = action.data.id
      const newArr = state.filter(each => each.id !== id)
      return newArr
    }
    case 'ADD_BLOG': {
      const newBlog = {
        ...action.data
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