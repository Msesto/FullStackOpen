import React from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const UserTable = ({ users }) => {
  if (!users) {
    return null
  }
  if (users && !Array.isArray(users)) {
    return (
      <>
        <h2>{users.name}</h2>
        <h3>Added blogs:</h3>
        <ul>
          {users.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </>
    )
  }

  const eaUser = (each) => (
    <tr key={each.id}>
      <td><Link to={`/users/${each.id}`}>{each.name}</Link></td>
      <td>{each.blogs.length}</td>
    </tr>
  )

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => eaUser(user))}
        </tbody>
      </table>
    </>
  )
}

export default UserTable