const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Article extends Model { }

Article.init(  {
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
     
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    modelName: `article`
}
);

module.exports = Article;