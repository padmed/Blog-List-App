const dummy = (array) => {
  return 1;
};

const totalLikes = (array) => {
  return array.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = { dummy, totalLikes };
