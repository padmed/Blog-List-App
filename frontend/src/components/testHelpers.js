import {  render } from '@testing-library/react'
import Blog from './Blog'

const mockUpdateBlog = jest.fn()
const mockRemoveBlog = jest.fn()

const loggedUser = {
  username: 'test',
  name: 'test',
}

const blog = {
  title: 'test',
  author: 'anonymus',
  url: 'test.com',
  user: {
    name: 'test',
    username: 'test'
  },
  likes: 0,
}

const renderBlog = () => {
  return render(<Blog blog={blog} user={loggedUser} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog}/>)
}

export default { renderBlog, blog, loggedUser, mockRemoveBlog, mockUpdateBlog }