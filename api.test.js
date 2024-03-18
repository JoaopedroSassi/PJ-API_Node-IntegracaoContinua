const supertest = require('supertest');
const {app, server, connection} = require('./index.js');

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('Teste POST /users', () => {
  it('deve responder com status 201', async () => {
    const response = await supertest(app).post('/users').send({name:"Joazinho", email:"joazinho@goldcs.com"});
    expect(response.statusCode).toBe(201);
  });
});

afterAll(() => {
  server.close();
  connection.end();
});