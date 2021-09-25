const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Compare entered password to password on file
class User extends Model{
    checkPassword(password){
        return bcrypt.compareSync(password, this.password);
    }
}

// Create User model with id, username, email, and hashed password
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        }
    },
    {
        // hash password
        hooks: {
            beforeCreate: async (newData) =>{
                const salt = 10;
                newData.password = await bcrypt.hash(newData.password, salt);
                return newData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;