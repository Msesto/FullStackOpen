import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ /*setBlogs*/ blog, setCondition, setNotification, user }) => {
  const [info, setInfo] = useState(false)
  const toggleInfo = () => {
    setInfo(!info)
  }

  const handleLike = async () => {
    try {
      blog.likes += 1
      await blogService.update({ likes: blog.likes + 1, author: blog.author, title: blog.author, url: blog.url }, blog.id)
      setNotification('You have liked the blog')
      setCondition('success')
    } catch (exception) {
      setNotification('Something went wrong, like not saved')
      setCondition('error')
    }
    setTimeout(() => {
      setNotification('')
      setCondition('')
    }, 5000)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      try {
        await blogService.deletion(blog.id)
        blogService.getAll().then(blogs => {
          blogs.sort((a, b) => b.likes - a.likes)
          /*setBlogs(blogs)*/
        })
        setNotification(`${blog.title} has been deleted.`)
        setCondition('success')
      } catch (exception) {
        setNotification('Something went wrong.')
        setCondition('error')
      }
      setTimeout(() => {
        setNotification('')
        setCondition('')
      }, 5000)
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
