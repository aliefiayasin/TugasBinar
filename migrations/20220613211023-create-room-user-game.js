'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomUserGames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomid: {
        type: Sequelize.INTEGER
      },
      userid1: {
        type: Sequelize.INTEGER
      },
      input1: {
        type: Sequelize.STRING
      },
      userid2: {
        type: Sequelize.INTEGER
      },
      input2: {
        type: Sequelize.STRING
      },
      winner: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoomUserGames');
  }
};