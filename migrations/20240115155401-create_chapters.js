'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chapters', {
      chapter_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      story_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stories', // Nama tabel sumber referensi
          key: 'story_id', // Nama kolom yang menjadi primary key di tabel sumber referensi
        },
      },
      chapter_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      story_chapter: {
        type: Sequelize.TEXT,
      },
      last_updated: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('chapters');
  },
};
