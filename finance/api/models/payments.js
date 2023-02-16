'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments',  {
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1
      }
    }, 
    nomeCartao: DataTypes.STRING,
    numeroCartao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^\d{16}/
      }
    },
    expiracao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^\d{4}-\d{2}/
      }
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^\d{3}/
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'CRIADO',
      validate: {
        notEmpty: true,
        isIn: [['CRIADO', 'CONFIRMADO', 'CANCELADO']]
      }
    }
  })
  Payments.associate = function(models) {
    Payments.hasOne(models.Invoices, {
      foreignKey: 'paymentId'
    })
  }
  
  return Payments;
}