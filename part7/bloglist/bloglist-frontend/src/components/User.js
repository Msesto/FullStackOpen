import React from 'react'
import {
  Link
} from 'react-router-dom'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Card,
} from '@material-ui/core'



const UserTable = ({ users }) => {
  if (!users) {
    return null
  }
  if (users && !Array.isArray(users)) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h2>{users.name}</h2>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>Added blogs:</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.blogs.map(blog => <TableRow key={blog.id}><TableCell>{blog.title}</TableCell></TableRow>)}
        </TableBody>
      </Table>
    )
  }

  const refreshHandler = async () => {
    await setTimeout(null, 1000)
    window.location.reload()
  }

  const eaUser = (each) => (
    <TableRow key={each.id}>
      <TableCell><Link to={`/users/${each.id}`} onClick={refreshHandler}>{each.name}</Link></TableCell>
      <TableCell>{each.blogs.length}</TableCell>
    </TableRow>
  )

  return (
    <Container>
      <h2>Users</h2>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Users</strong></TableCell>
              <TableCell><strong>Blogs created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => eaUser(user))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  )
}

export default UserTable