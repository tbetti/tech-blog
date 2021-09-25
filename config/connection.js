// Set up connection to Sequelize using .env file to run models
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Allow for connection to Heroku site
if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    // Heroku needs access to DB
    // If it doesn't have it, it's on the local environment
    // DB will be up and running on production
    // To seed, we will import using JAWSDB or use app to inject data
}else{
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;