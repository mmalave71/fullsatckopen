import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import { mockComponent } from 'react-dom/test-utils'

test('render a blog',() => {

  const blog = {title:'El placer de la lectura',
    author:'Connie Zurita',
    url:'http://elplacerdelalectura.com/blog',
    likes:37,
    user:{ username:'mmalave',name:'Miguel Malave',id:'628b776d1eea0e62e992ffa4'},id:'628b7b7940b7446329511f6a'}

  const user ={ name: 'Miguel Malave',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGI3NzZkMWVlYTBlNjJlOTkyZmZhNCIsInVzZXJuYW1lIjoibW1hbGF2ZSIsImlhdCI6MTY1NDUzNDc5M30.8w_u6MQgqGuxFLIsGC2HrAJsCle2sW1HHMwFqlqfjN8',
    username: 'mmalave'} 

  const component = render (<Blog blog={blog} user={user}  />)

  component.debug()
  //expect(component.container).toHaveTextContent('El placer de la lectura')
  expect(component.container).toHaveTextContent(blog.title)
  //expect(component.container).toHaveTextContent('Connie Zurita')
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(`likes: ${blog.likes}`)

})

test('clicking the button show url an likes',() => {
  const blog = {title:'El placer de la lectura',
    author:'Connie Zurita',
    url:'http://elplacerdelalectura.com/blog',
    likes:37,
    user:{ username:'mmalave',name:'Miguel Malave',id:'628b776d1eea0e62e992ffa4'},id:'628b7b7940b7446329511f6a'}

  const user ={ name: 'Miguel Malave',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGI3NzZkMWVlYTBlNjJlOTkyZmZhNCIsInVzZXJuYW1lIjoibW1hbGF2ZSIsImlhdCI6MTY1NDUzNDc5M30.8w_u6MQgqGuxFLIsGC2HrAJsCle2sW1HHMwFqlqfjN8',
    username: 'mmalave' }

  const component = render (<Blog blog={blog} user={user}  />)

  const button=component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(`likes: ${blog.likes}`)

})
test('clicking the button likes twice ',() => {
  const blog = {title:'El placer de la lectura',
    author:'Connie Zurita',
    url:'http://elplacerdelalectura.com/blog',
    likes:37,
    user:{ username:'mmalave',name:'Miguel Malave',id:'628b776d1eea0e62e992ffa4'},id:'628b7b7940b7446329511f6a'}

  const user ={ name: 'Miguel Malave',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGI3NzZkMWVlYTBlNjJlOTkyZmZhNCIsInVzZXJuYW1lIjoibW1hbGF2ZSIsImlhdCI6MTY1NDUzNDc5M30.8w_u6MQgqGuxFLIsGC2HrAJsCle2sW1HHMwFqlqfjN8',
    username: 'mmalave' }

  const mockHandler = jest.fn()

  const component= render(<Blog blog={blog} handleLike={mockHandler} user={user}/>)
  component.debug()

  const buttonView = component.getByText('view')
  console.log('buttonview=',prettyDOM(buttonView))
  fireEvent.click(buttonView)

  const buttonLike=component.getByText('like')
  console.log('buttonLike',prettyDOM(buttonLike))
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
