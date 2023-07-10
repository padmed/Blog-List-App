const dummy = (array) => {
  return 1;
};

const totalLikes = (array) => {
  return array.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (array) => {
  if (array.length > 0) {
    const topBlog = array.reduce((acc, obj) => {
      if (obj.likes > acc.likes) {
        return obj;
      }
      return acc;
    });

    return {
      title: topBlog.title,
      author: topBlog.author,
      likes: topBlog.likes,
    };
  }
  return null;
};

module.exports = { dummy, totalLikes, favoriteBlog };
