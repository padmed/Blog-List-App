import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event/'
import BlogForm from './BlogForm'

test('Filling a blog form works', async () => {
  const mockSaveNewBlog = jest.fn()
  const form = render(<BlogForm saveNewBlog={mockSaveNewBlog}/>).container
  const user = UserEvent.setup()

  const testBlog = {
    author: 'test author',
    title: 'test title',
    url: 'test url'
  }

  const titleInput = form.querySelector('#title')
  await user.type(titleInput, testBlog.title)

  const authorInput = form.querySelector('#author')
  await user.type(authorInput, testBlog.author)

  const urlInput = form.querySelector('#url')
  await user.type(urlInput, testBlog.url)

  const submitBtn = screen.getByRole('button', { name: /create/i })
  await user.click(submitBtn)


  const savedBlog = mockSaveNewBlog.mock.calls[0][0]
  expect(mockSaveNewBlog.mock.calls).toHaveLength(1)
  expect(savedBlog.title).toBe(testBlog.title)
  expect(savedBlog.author).toBe(testBlog.author)
  expect(savedBlog.url).toBe(testBlog.url)
})