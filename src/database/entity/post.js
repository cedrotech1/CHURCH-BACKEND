"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Posts extends Model {
    static associate(models) {
      Posts.belongsTo(models.User, { foreignKey: "userid", as: "PostsUser" });
    }
  }

  Posts.init(
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Posts", 
    }
  );

  return Posts;
};
