'use strict';
module.exports = (sequelize, DataTypes) => {
    const Invoices = sequelize.define('Invoices',  {
        descricao: DataTypes.JSON,
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        modelName: 'Invoices'
    })
    Invoices.associate = function(models) {
        Invoices.belongsTo(models.Payments, {
            foreignKey: 'paymentId'
        })
    }
    return Invoices;
}