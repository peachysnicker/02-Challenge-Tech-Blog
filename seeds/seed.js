const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogPosts.json');
const commentData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users =  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs =  Blog.bulkCreate(blogData, {
      individualHooks: true,
      returning: true,
    });

  const comments =  Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
  });

  process.exit(0);
};

seedDatabase();
