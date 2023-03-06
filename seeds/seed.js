const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogPosts.json');
const commentData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData, {
      individualHooks: true,
      returning: true,
    });

  const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
  });
  console.log(users);
  console.log(blogs);
  console.log(comments);

  process.exit(0);
}

seedDatabase();
