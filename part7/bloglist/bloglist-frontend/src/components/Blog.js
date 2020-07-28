import React, { useState } from 'react'

import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [info, setInfo] = useState(false)
  const toggleInfo = () => {
    setInfo(!info)
  }

  const dispatch = useDispatch()

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

  const deleteButton = () => (
    <button id='deleteBtn' type='submit' onClick={handleDelete}> Delete </button>
  )

  if (info) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}
          <button onClick={toggleInfo}> Hide </button>
          <br />
          {blog.url}
          <br />
          Likes: {blog.likes}
          <button type='push' id='like' onClick={handleLike}> Like </button>
          <br />
          {blog.author}
          <br />
          {user.username === blog.user.username && deleteButton()}
        </p>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button id='info' onClick={toggleInfo}> Info </button>
      </div>
    )
  }
}

export default Blog
