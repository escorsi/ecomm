'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        valor: 200.00,
        nomeCartao: 'Patrick',
        numeroCartao: '545677646464',
        expiracao: '2000-12',
        cvv: '111',
        status: 'CRIADO',
        createdAt: new Date(),
        updatedAt:  new Date()
      }, 
      {
        valor: 155.00,
        nomeCartao: 'Oxynis',
        numeroCartao: '12345678',
        expiracao: '2090-10',
        cvv: '123',
        status: 'CRIADO',
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        valor: 2001.00,
        nomeCartao: 'Teste',
        numeroCartao: '5555555555',
        expiracao: '2050-01',
        cvv: '222',
        status: 'CRIADO',
        createdAt: new Date(),
        updatedAt:  new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
