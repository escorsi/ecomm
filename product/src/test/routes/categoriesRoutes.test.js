/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /categories', () => {
  it('Deve retornar uma lista de categorias', async () => {
    const resposta = await request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nome).toEqual('INFORMÁTICA');
  });
});

let idResposta;
describe('POST em /api/admin/categories', () => {
  it('Deve adicionar uma nova categoria', async () => {
    const resposta = await request(app)
      .post('/api/admin/categories')
      .send({
        nome: 'Teste',
        status: 'ATIVO',
      })
      .expect(201);

    idResposta = resposta.body._id;
  });
  it('Não deve adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/api/admin/categories')
      .send({})
      .expect(500);
  });
});

describe('GET em /categories/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/api/categories/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/categories/id', () => {
  test.each([
    ['nome', { nome: 'Teste2' }],
    ['status', { status: 'INATIVO' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/api/admin/categories/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /api/admin/categories/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/api/admin/categories/${idResposta}`)
      .expect(200);
  });
});
