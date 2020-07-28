import React, { useState } from 'react'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewBlogForm = ({ testFunc, blogFormRef }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (e) => {
    e.preventDefault()
    console.log('hi into handler')
    try {
      dispatch(createBlog({ title, author, url, }))
      dispatch(setNotification(`A new blog was added, '${title}' by ${author} was successfully saved.`, 5))
      setTitle('')
      setAuthor('')
      setUrl('')
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

export default NewBlogForm