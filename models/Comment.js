const sequelize = require('../../config/config');
const { Sequelize, Model, DataTypes } = require('sequelize');

class Comment extends Model{}

Comment.init(
    {
        content: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
    },
);

module.exports = Comment;