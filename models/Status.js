'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Status.init(
    {
      status_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Status',
      tableName: 'statuses',
      timestamps: true,
    }
  );
  return Status;
};
