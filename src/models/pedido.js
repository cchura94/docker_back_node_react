'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Pedido.belongsToMany(models.Producto, {
        through: "PedidoProducto"
      })

      models.Pedido.belongsTo(models.Cliente, {
        foreignKey: "clienteId"
      })
    }
  }
  Pedido.init({
    fecha: DataTypes.DATE,
    observacion: DataTypes.TEXT,
    estado: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};