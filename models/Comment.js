const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull:false,
      
    },
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: `blog`,
            key: `id`
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model:`user`,
            key: `id`
        }
    }
},
{
    sequelize,
    freezeTableName:true,
    underscored:true,
    timestamps:true,
    modelName:`comment`
});

module.exports = Comment;