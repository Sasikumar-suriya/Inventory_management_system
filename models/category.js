"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
        Category.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'user' });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.CHAR,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdBy:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Category",
      timestamps: true,
    }
  );

  return Category;
};
