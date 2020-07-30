import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, initComments } from '../reducers/commentReducer'

import { Table, TableBody, TableRow, TableCell, TextField, Button, Icon } from '@material-ui/core'

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
      <div>
        <Table>
          <TableBody>
            {comments.map(each => <TableRow key={each.id}><TableCell><strong>{each.comment}</strong></TableCell></TableRow>)}
          </TableBody>
        </Table>
      </div>
      <form onSubmit={inputHandler}>
        <TextField id="outlined-primary"
          label="Comment"
          variant="outlined"
          color="primary"
          size="small"
          name='newComment'
          type='text' />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          type='submit'
        >
          Send comment
        </Button>
      </form>
    </>
  )
}

export default Comments