const _ = require("lodash");

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

const mostBlogs = (array) => {
  const blogCount = _.countBy(array, "author"); // Counts occurance of property valie - "author"
  const topAutor = _.maxBy(
    _.toPairs(blogCount),
    ([name, blogCount]) => blogCount
  ); // Finds author with the most blogs

  return topAutor
    ? {
        author: topAutor[0],
        blogs: topAutor[1],
      }
    : null;
};

const mostLikes = (array) => {
  // Stores authors and their total likes
  let authorLikesStats = [];
  // Groups blogs by their authors
  const groupByAuthors = _.groupBy(array, "author");

  // Traverses through every author and sums up likes of their blogs
  _.forEach(groupByAuthors, (blogs, author) => {
    const likes = _.sumBy(blogs, "likes");
    authorLikesStats.push({ author, likes });
  });

  // Gets the author with the most likes
  const mostLikesReducer = (top, current) => {
    if (current.likes > top.likes) {
      return current;
    }
    return top;
  };

  return authorLikesStats.length > 0
    ? authorLikesStats.reduce(mostLikesReducer)
    : null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
