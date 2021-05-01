const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/config');

class Post extends Model {
}

Post.init(
    {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    },
    {
        sequelize,
    },
);

module.exports = Post;