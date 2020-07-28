import React, { useState } from 'react'
import blogService from '../services/blogs'
// import PropTypes from 'prop-types'

import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewBlogForm = ({ setBlogs, testFunc, blogFormRef }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (e) => {
    e.preventDefault()
    console.log('hi into handler')
    try {
      await blogService.create({
        title, author, url,
      })
      dispatch(setNotification(`A new blog was added, '${title}' by ${author} was successfully saved.`, 5))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('The new blog failed to save', 5))
    }
  }

  return (
    <div>
      <h2> Create new blog </h2>
      <form onSubmit={testFunc || handleNewBlog}>
        <div>
          Title:
          <input id='titleIn' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          Author:
          <input id='authorIn' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          URL:
          <input id='urlIn' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button id='submitBlog' type='submit'>Create</button>
      </form>
    </div>
  )
}

// NewBlogForm.propTypes = {
//   blogFormRef: PropTypes.object.isRequired,
//   setNotification: PropTypes.func.isRequired,
//   setCondition: PropTypes.func.isRequired
// }

export default NewBlogForm