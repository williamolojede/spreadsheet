import { Sequelize, Model } from 'sequelize';

export default class Row extends Model {
  static modelFields = {
  }
  static associate(models) {
    Row.hasMany(models.Cell, {
      foreignKey: 'rowId',
      as: 'cells',
    });
  }

  static init(sequelize) {
    const model = super.init(Row.modelFields, { sequelize });
    return model;
  }
}