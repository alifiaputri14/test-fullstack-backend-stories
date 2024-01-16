'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StoryTag extends Model {
    static associate(models) {
      // StoryTag belongs to a Story
      StoryTag.belongsTo(models.Story, {
        foreignKey: 'story_id',
        as: 'story',
      });
    }
  }
  StoryTag.init(
    {
      tag_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag_name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'StoryTag',
      tableName: 'story_tags',
      timestamps: true,
    }
  );
  return StoryTag;
};
