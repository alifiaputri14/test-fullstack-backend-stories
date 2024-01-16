'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stories', {
      story_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      synopsis: {
        type: Sequelize.TEXT,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      story_cover: {
        type: Sequelize.STRING,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'statuses',
          key: 'status_id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stories');
  },
};
