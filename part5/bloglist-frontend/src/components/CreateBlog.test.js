import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './CreateBlog'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm testFunc={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')


  fireEvent.change(author, {
    target: { value: 'Johny\'s wonders' }
  })
  fireEvent.change(title, {
    target: { value: 'Golden state\'s top 10!' }
  })
  fireEvent.change(url, {
    target: {
      value: 'http://whatoneartharethose.party/api/top-10/Johnys/Golden-States'
    }
  })
  fireEvent.submit(form)



  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('Johny\'s wonders')
})
