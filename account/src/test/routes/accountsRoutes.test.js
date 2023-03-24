/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import request from 'supertest';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-account-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET em /api/admin/accounts', () => {
  it('Deve retornar uma lista de usuários', async () => {
    await request(app)
      .get('/api/admin/accounts')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/accounts', () => {
  it('Deve adicionar uma novo usuário', async () => {
    const resposta = await request(app)
      .post('/api/admin/accounts')
      .send({
        nome: 'Teste',
        cpf: '99999999999',
        email: 'teste@example.com',
        senha: 'T$ste12345',
        telefone: '17999999999',
        dataCriacao: new Date(),
        endereco: {
          rua: 'Rua da Pedra do Reino',
          numero: '725',
          complemento: 'nada',
          cep: '58069545',
          cidade: 'João Pessoa',
          estado: 'PB',
        },
        id_info: '63ecd7eaee28ab6b3ee4e54f',
      })
      .expect(201);

    idResposta = resposta.body._id;
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/api/admin/accounts')
      .send({})
      .expect(400);
  });
});

describe('GET em /api/accounts/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/api/accounts/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/accounts/id', () => {
  test.each([
    ['nomeProduto', { nomeProduto: 'Teste2' }],
    ['slug', { slug: 'test-test2' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/api/admin/accounts/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /api/admin/accounts/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/api/admin/accounts/${idResposta}`)
      .expect(200);
  });
});
