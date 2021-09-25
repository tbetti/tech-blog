const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Create connection between user and their posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'Cascade',
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Create connection between user and comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Create connection between comments and posts
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'Cascade'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

module.exports = { User, Post, Comment };