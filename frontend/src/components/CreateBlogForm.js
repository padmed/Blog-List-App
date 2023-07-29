const CreateBlogForm = (props) => {
  const inputs = props.inputValues;
  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={props.handleCreateBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            onChange={props.handleInputChange}
            value={inputs.title}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            onChange={props.handleInputChange}
            value={inputs.author}
          ></input>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            onChange={props.handleInputChange}
            value={inputs.url}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
