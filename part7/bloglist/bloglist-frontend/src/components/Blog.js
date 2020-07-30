import React from 'react'

import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import DeleteIcon from '@material-ui/icons/Delete'
import { TableRow, TableCell, Table, TableHead, TableBody, Button } from '@material-ui/core'

const Blog = ({ history, refresh, blog, user, lucky = 0 }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

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
        history.push('/')
        refresh()
      } catch (exception) {
        dispatch(setNotification('Something went wrong.', 5))
      }
    }
  }

  const refreshHandler = async () => {
    await setTimeout(null, 1000)
    window.location.reload()
  }

  const deleteButton = () => (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
      id='deleteBtn'
      type='submit'
      onClick={handleDelete}>
      Delete
    </Button>
  )

  if (lucky === 11) {
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {blog.title}, by {blog.author}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {blog.url}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Likes: {blog.likes}
                <Button color='primary' type='push' id='like' onClick={handleLike}> Like </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Added by {blog.user.username}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {user.username === blog.user.username && deleteButton()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Comments blog={blog}></Comments>
      </>
    )
  } else {
    return (
      <TableRow>
        <TableCell><Link to={`/blogs/${blog.id}`} onClick={refreshHandler}>{blog.title}</Link></TableCell>
        <TableCell align='right'><em>{blog.author}</em></TableCell>
      </TableRow>
    )
  }
}

export default Blog
