/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const {
  describe, it,
} = require('@jest/globals');
const app = require('../../index.js');

let idResposta;
describe('POST em /api/payments', () => {
  it('Deve adicionar um novo pagamento', async () => {
    const resposta = await request(app)
      .post('/api/payments')
      .send({
        valor: 920.55,
        nomeCartao: 'Olnar',
        numeroCartao: '5433093642583224',
        expiracao: '2027-05',
        cvv: '379',
        status: 'CRIADO',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .expect(201);

    idResposta = resposta.body.id;
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/api/payments')
      .send({})
      .expect(500);
  });
});

describe('GET em /api/payments/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/api/payments/${idResposta}`)
      .expect(200);
  });
});

describe('PATCH em /api/payments/id', () => {
  test.each([
    ['valor', { valor: 1000.00 }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .patch(`/api/payments/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});
