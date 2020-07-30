import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, initComments } from '../reducers/commentReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initComments(blog.id))
  }, [dispatch, blog.id])

  const comments = useSelector(state => state.comments)
  const inputHandler = (e) => {
    e.preventDefault()
    const newComment = e.target.newComment.value
    e.target.newComment.value = ''
    dispatch(addComment(newComment, blog.id))
  }

  return (
    <>
      <ul>
        {comments.map(each => <li key={each.id}>{each.comment}</li>)}
      </ul>
      <form onSubmit={inputHandler}>
        <input name='newComment' type='text'></input>
        <button type='submit'>Add Comment</button>
      </form>
    </>
  )
}

export default Comments