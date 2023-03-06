const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Blog extends Model{}

Blog.init(  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
     
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: `user`,
            key: `id`
        }
    }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: `blog`
}
);

module.exports = Blog;