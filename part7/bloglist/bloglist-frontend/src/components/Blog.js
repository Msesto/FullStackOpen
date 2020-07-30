import React from 'react'

import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { addComment, initComments } from '../reducers/commentReducer'
import Comments from './Comments'

const Blog = ({ blog, user, lucky = 0 }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  // if (lucky === 11) {
  //   dispatch(initComments(blog.id))
  // }

  const handleLike = async () => {
    try {
      dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }, blog.id))
      dispatch(setNotification('You have liked the blog', 5))
    } catch (exception) {
      dispatch(setNotification('Something went wrong, like not saved', 5))
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`${blog.title} has been deleted.`, 5))
      } catch (exception) {
        dispatch(setNotification('Something went wrong.', 5))
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const refreshHandler = async () => {
    await setTimeout(null, 1000)
    window.location.reload()
  }

  const deleteButton = () => (
    <button id='deleteBtn' type='submit' onClick={handleDelete}> Delete </button>
  )

  if (lucky === 11) {
    return (
      <div style={blogStyle}>
        <h2>{blog.title}, by {blog.author}</h2>
        <p>
          {blog.url}
          <br />
          Likes: {blog.likes}
          <button type='push' id='like' onClick={handleLike}> Like </button>
          <br />
          Added by {blog.user.username}
          <br />
          {user.username === blog.user.username && deleteButton()}
        </p>
        <Comments blog={blog}></Comments>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${blog.id}`} onClick={refreshHandler}>{blog.title} {blog.author}</Link>
      </div>
    )
  }
}

export default Blog
