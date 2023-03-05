const User = require('./User');
const Blog = require('/Blog');
const Comment = require('/Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Blog.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.hasMany(Comment, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

Comment.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

Blog.hasMany(Comment, {
    foreignKey:`article_id`,
    onDelete: `CASCADE`
});

Comment.belongsTo(Blog, {
    foreignKey: `article_id`,
    onDelete: `CASCADE`
});

module.exports = { User, Blog, Comment };
