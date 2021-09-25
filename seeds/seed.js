// Import models and data
const { User, Post } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');

// Establish sequelize connection
const sequelize = require('../config/connection');

// Seed all models
const seedAll = async() =>{
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Post.bulkCreate(postData);

    process.exit(0);
}

seedAll();