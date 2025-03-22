"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
        Product.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'user' });
        Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.CHAR,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      productColor:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      productImages:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      priceOfone:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      height:{
        type: DataTypes.STRING(255),
        allowNull:true,  
      },
      weight:{
        type: DataTypes.STRING(255),
        allowNull:true, 
      },
      brandName:{
        type: DataTypes.STRING(255),
        allowNull:true, 
      },
      width:{
        type: DataTypes.STRING(255),
        allowNull:true,  
      },
      size:{
        type: DataTypes.STRING(255),
        allowNull:true,
      },
      material:{
        type: DataTypes.STRING(255),
        allowNull:true,
      },
      manufactureDate:{
        type: DataTypes.DATE,
        allowNull: true,
      },
      expireyDate:{
        type: DataTypes.DATE,
        allowNull: true,
      },
      categoryId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Category',
          key: 'id'
        },
        onDelete: 'SET NULL'
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
      modelName: "Product",
      tableName: "Product",
      timestamps: true,
    }
  );

  return Product;
};
