"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Koraris extends Model {
    static associate(models) {
      Koraris.belongsTo(models.User, { foreignKey: "admin", as: "KorariUser" });
      Koraris.hasMany(models.Posts, { foreignKey: "korariId", as: "Posts" }); // Add this line
    }
  }

  Koraris.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Koraris", 
    }
  );

  return Koraris;
};
