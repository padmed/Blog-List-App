import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ saveNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogInputChange = (event) => {
    const propertyToChange = event.target.id
    const valueToChange = event.target.value

    if (propertyToChange in newBlog) {
      setNewBlog({ ...newBlog, [propertyToChange]: valueToChange })
    }
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    saveNewBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            onChange={handleBlogInputChange}
            value={newBlog.title}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            onChange={handleBlogInputChange}
            value={newBlog.author}
          ></input>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            onChange={handleBlogInputChange}
            value={newBlog.url}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  saveNewBlog: PropTypes.func.isRequired
}

export default BlogForm
