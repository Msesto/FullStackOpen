import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [condition, setCondition] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setNotification(`Welcome back ${user.name}.`)
      setCondition('success')
      setTimeout(() => {
        setNotification('')
        setCondition('')
      }, 5000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setCondition('error')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotification('')
        setCondition('')
      }, 5000)
    }
  }

  const logoutHandler = () => {
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification(`${user.name} has logged out.`)
    setCondition('success')
    setTimeout(() => {
      setNotification('')
      setCondition('')
    }, 5000)
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
      <div>
        <p>{user.name} is logged in.</p>
        <button type='button' onClick={logoutHandler}>Log out</button>
      </div>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <NewBlogForm blogs={blogs} /*setBlogs={setBlogs}*/ blogFormRef={blogFormRef} setNotification={setNotification} setCondition={setCondition}></NewBlogForm>
      </Togglable>
      <div id='blogList'>
        {blogs.map(blog =>
          <Blog /*setBlogs={setBlogs}*/ user={user} setCondition={setCondition} setNotification={setNotification} key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={notification} className={condition}></Notification>
      <h1> Blogs </h1>
      {user === null && loginForm()}
      {user !== null && blogShowcase()}
    </div>
  )
}

export default App