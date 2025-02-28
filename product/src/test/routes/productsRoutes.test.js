/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import request from 'supertest';
import {
  describe, it,
} from '@jest/globals';
import app from '../../app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-product-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET em /api/products', () => {
  it('Deve retornar uma lista de produtos', async () => {
    await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/products', () => {
  it('Deve adicionar uma novo produto', async () => {
    const resposta = await request(app)
      .post('/api/admin/products')
      .send({
        nomeProduto: 'Teste',
        descricao: 'Objeto teste para testes',
        slug: 'teste-test',
        precoUnitario: 20,
        quantidadeEstoque: 2,
        categoria: {
          nome: 'Teste',
          categoria_id: '63ebd61f345d70584e90a66a',
        },
      })
      .expect(201);

    idResposta = resposta.body._id;
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/api/admin/products')
      .send({})
      .expect(500);
  });
});

describe('GET em /api/products/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/api/products/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/products/id', () => {
  it('Deve alterar um produto', async () => {
    await request(app)
      .put(`/api/admin/products/${idResposta}`)
      .send({
        nomeProduto: 'Teste2',
        descricao: 'Apenas testando',
        slug: 'teste2-test2',
        precoUnitario: 50.25,
        quantidadeEstoque: 4,
        categoria: {
          nome: 'Teste',
          categoria_id: '63ebd61f345d70584e90a66a',
        },
      })
      .expect(200);
  });
});

describe('DELETE em /api/admin/products/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/api/admin/products/${idResposta}`)
      .expect(200);
  });
});
