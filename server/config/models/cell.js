import { Sequelize, Model } from 'sequelize';

export default class Cell extends Model {
  static modelFields = {
    value: {
      defaultValue: '',
      type: Sequelize.STRING
    },
    column: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }

  static associate(models) {
    Cell.belongsTo(models.Row, {
      foreignKey: 'rowId',
      onDelete: 'CASCADE',
    });
  }

  static init(sequelize) {
    const model = super.init(Cell.modelFields, { sequelize });
    return model;
  }
}