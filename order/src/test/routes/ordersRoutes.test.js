/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import {
  describe, jest, it,
} from '@jest/globals';
import app from '../../app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-order-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

let idResposta;
describe('POST em /api/admin/orders', () => {
  it('Deve adicionar um novo pedido', async () => {
    const resposta = await request(app)
      .post('/api/admin/orders')
      .send({
        data: new Date(),
        endereco: {
          rua: 'Rua da Pedra do Reino',
          numero: '725',
          complemento: 'Casa 6',
          cep: '58069545',
          cidade: 'João Pessoa',
          estado: 'PB',
        },
        id_usuario: '63ecdf9090c0033d6d411587',
        nome: 'Teste',
        cpf: '12345678910',
        produtos: {
          id: '63ecd37864583b1156950b04',
          nome: 'Refactoring Improving the Design of Existing Code',
          quantidadePedido: 1,
          desconto: 20.0,
          valorTotal: 150.0,
        },
        status: 'REALIZADO',
      })
      .expect(201);

    idResposta = resposta.body._id;
  });
  it('Não deve adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/api/admin/orders')
      .send({})
      .expect(500);
  });
});

describe('GET em /api/admin/orders/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/api/admin/orders/${idResposta}`)
      .expect(200);
  });
});

describe('PATCH em /api/admin/orders/id', () => {
  test.each([
    ['nome', { vnome: 'Teste' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .patch(`/api/admin/orders/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});
