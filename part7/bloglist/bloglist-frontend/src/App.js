import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'

import {
  BrowserRouter as
    Switch, Route, useRouteMatch, Link
} from "react-router-dom"

import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import UserTable from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

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
      dispatch(setNotification('Wrong credentials.', 5))
      setUsername('')
      setPassword('')
    }
  }

  const logoutHandler = () => {
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setNotification(`${user.name} has logged out.`, 5))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginSubmit' type="submit">login</button>
    </form>
  )

  const blogShowcase = () => (
    <div>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <NewBlogForm blogs={blogs} blogFormRef={blogFormRef} ></NewBlogForm>
      </Togglable>
      <div id='blogList'>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog user={user} key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  const match = useRouteMatch('/users/:id')
  const uniqueUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const uniqueBlog = blogMatch ? blogs.find(each => each.id === blogMatch.params.id) : null


  const padding = {
    padding: 5
  }

  const refreshHandler = async () => {
    await setTimeout(null, 1000)
    window.location.reload()
  }

  return (
    <div>
      <div style={{ backgroundColor: 'lightblue' }}>
        <Link style={padding} to='/' onClick={refreshHandler}>home</Link>
        <Link style={padding} to='/blogs' onClick={refreshHandler}>blogs</Link>
        <Link style={padding} to='/users' onClick={refreshHandler}>users</Link>
        {user !== null && <><p style={{ ...padding, display: 'inline-block' }}>{user.name} is logged in</p>
          <button type='button' onClick={logoutHandler}>Log out</button></>}
      </div>
      <div>
        <Notification></Notification>
      </div>
      <Switch>
        <Route exact path='/blogs/:id'>
          <Blog user={user} blog={uniqueBlog} lucky={11} />
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
    </div>
  )
}

export default App