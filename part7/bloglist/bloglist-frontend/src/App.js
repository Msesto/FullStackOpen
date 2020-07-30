import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'

import Container from '@material-ui/core/Container'

import {
  BrowserRouter as
    Switch, Route, useRouteMatch, Link, useHistory
} from 'react-router-dom'

import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import UserTable from './components/User'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TableContainer,
  TableBody,
  Table,
  TextField,
  Paper
} from '@material-ui/core'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setNotification(`Welcome back ${user.name}`))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials.', 10))
      setUsername('')
      setPassword('')
    }
  }

  const logoutHandler = () => {
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    history.push('/')
    dispatch(setNotification(`${user.name} has logged out.`, 5))
    refreshHandler()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <TextField label="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField label='password'
          value={password}
          type='password'
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant='contained' color='primary' type="submit">login</Button>
    </form>
  )

  const blogShowcase = () => (
    <div>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <NewBlogForm blogs={blogs} blogFormRef={blogFormRef} ></NewBlogForm>
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog user={user} key={blog.id} blog={blog} />

            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

  const match = useRouteMatch('/users/:id')
  const uniqueUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const uniqueBlog = blogMatch ? blogs.find(each => each.id === blogMatch.params.id) : null

  const refreshHandler = async () => {
    await setTimeout(null, 1000)
    window.location.reload()
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to='/' onClick={refreshHandler}>
            home
          </Button>
          <Button color="inherit" component={Link} to='/blogs' onClick={refreshHandler}>
            blogs
          </Button>
          <Button color="inherit" component={Link} to='/users' onClick={refreshHandler}>
            users
          </Button>
          {user !== null && <><em>{user.name} is logged in</em>

            <Button variant="contained" color="primary" onClick={logoutHandler}>Log out</Button></>}
        </Toolbar>
      </AppBar>
      <div>
        <Notification></Notification>
      </div>
      <Switch>
        <Route exact path='/blogs/:id'>
          <Blog refresh={refreshHandler} history={history} user={user} blog={uniqueBlog} lucky={11} />
        </Route>
        <Route exact path='/users/:id'>
          <UserTable users={uniqueUser}></UserTable>
        </Route>
        <Route exact path='/users'>
          <UserTable users={users}></UserTable>
        </Route>
        <Route exact path='/blogs'>
          {user !== null && blogShowcase()}
        </Route>
        <Route exact path='/'>
          {user === null && loginForm()}
          {user !== null && blogShowcase()}
        </Route>
      </Switch>
    </Container>
  )
}

export default App