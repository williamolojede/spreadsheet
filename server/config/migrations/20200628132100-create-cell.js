import logger from '../logger';

export default {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Cells', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
      },
      column: {
        // unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      rowId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Rows',
          key: 'id',
          as: 'rowId',
        },
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
    .dropTable('Cells')
    .catch(error => logger.error(error.stack)),
}