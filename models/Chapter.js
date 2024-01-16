'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    static associate(models) {
      this.belongsTo(models.Story, {
        foreignKey: 'story_id',
        as: 'story',
      });
    }
  }
  Chapter.init(
    {
      chapter_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      story_chapter: {
        type: DataTypes.TEXT,
      },
      last_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chapter',
      tableName: 'chapters',
      timestamps: true,
    }
  );
  return Chapter;
};
