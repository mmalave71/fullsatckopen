import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test(' <BlogForm /> updates parent state and calls onSubmit',() => {
  const createblog=jest.fn()
  const component=render(<BlogForm createBlog={createblog} />)

  const inputTitle=component.container.querySelector('#title')
  console.log('inputTitle',prettyDOM(inputTitle))

  const inputAuthor=component.container.querySelector('#author')
  console.log('inputAuthor',prettyDOM(inputAuthor))

  const inputUrl=component.container.querySelector('#url')
  console.log('inputUrl',prettyDOM(inputUrl))

  const form = component.container.querySelector('form')
  console.log('form',prettyDOM(form))

  fireEvent.change(inputTitle,{ target:{ value:'El placer de la lectura' } })
  fireEvent.change(inputAuthor,{ target:{ value:'Connie Zurita' } })
  fireEvent.change(inputUrl, { target:{ value:'http://elplacerdelalectura.com/blog' } })
  //console.log('form 2',prettyDOM(form))
  fireEvent.submit(form)
 
  expect(createblog.mock.calls).toHaveLength(1)

  console.log('alpha',createblog.mock.calls[0][0])
  expect(createblog.mock.calls[0][0].title).toBe('El placer de la lectura' )
  expect(createblog.mock.calls[0][0].author).toBe('Connie Zurita' )
  expect(createblog.mock.calls[0][0].url).toBe('http://elplacerdelalectura.com/blog'  )

})