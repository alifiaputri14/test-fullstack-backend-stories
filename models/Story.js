'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      // Story belongs to a Category
      Story.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      // Story belongs to a Status
      Story.belongsTo(models.Status, {
        foreignKey: 'status_id',
        as: 'status',
      });

      // Story has many StoryTags
      Story.hasMany(models.StoryTag, {
        foreignKey: 'story_id',
        as: 'story_tags',
      });
    }
  }

  Story.init(
    {
      story_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      author: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      synopsis: {
        type: DataTypes.TEXT,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      story_cover: {
        type: DataTypes.STRING,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Story',
      tableName: 'stories',
      timestamps: true,
    }
  );

  return Story;
};