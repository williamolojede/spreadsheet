import logger from '../logger';

export default {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Rows', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .catch(error => logger.error(error.stack)),
  down: queryInterface => queryInterface
    .dropTable('Rows')
    .catch(error => logger.error(error.stack)),
}