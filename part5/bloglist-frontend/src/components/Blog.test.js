import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders reduced contents', () => {
  const blog = {
    title: 'Madness abord!',
    author: 'Madman',
    url: 'flying.party/crash-at-2100',
    likes: 420
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Madness abord'
  )
  expect(component.container).toHaveTextContent(
    'Madman'
  )
  expect(component.container).not.toHaveTextContent(
    '420'
  )
  expect(component.container).not.toHaveTextContent(
    'flying.party/crash-at-2100'
  )
})

test('renders extended contents', () => {
  const blog = {
    title: 'Madness abord!',
    author: 'Madman',
    url: 'flying.party/crash-at-2100',
    likes: 420,
    user: { username: 'yep no matching here' }
  }
  const user = {
    username: 'notGonaMatch'
  }
  const component = render(
    <Blog user={user} blog={blog} />
  )

  const button = component.getByText('Info')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(
    'Madness abord'
  )
  expect(component.container).toHaveTextContent(
    'Madman'
  )
  expect(component.container).toHaveTextContent(
    '420'
  )
  expect(component.container).toHaveTextContent(
    'flying.party/crash-at-2100'
  )
})

test('likes handler works continuosly', async () => {
  const blog = {
    title: 'Madness abord!',
    author: 'Madman',
    url: 'flying.party/crash-at-2100',
    likes: 420,
    user: { username: 'yep no matching here' }
  }
  const user = {
    username: 'notGonaMatch'
  }
  const component = render(
    <Blog user={user} blog={blog} />
  )

  const button = component.getByText('Info')
  fireEvent.click(button)
  const likeBtn = component.container.querySelector('#like')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(blog.likes).toBe(
    422
  )
})

