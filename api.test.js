const supertest = require('supertest');
const {app, server, connection} = require('./index.js');
var idCriado;

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach(element => {
      expect(element).toHaveProperty("name");
    });

  });
});

describe('Teste POST /users', () => {
  it('deve responder com status 201', async () => {
    const response = await supertest(app).post('/users').send({name:"Joazinho", email:"joazinho@goldcs.com"});
    expect(response.statusCode).toBe(201);
    idCriado = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBeGreaterThan(0);

  });
});

describe('Teste PUT /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).put('/users/1').send({name:"Joazinho 2", email:"joazinho22@goldcs.com"});
    expect(response.statusCode).toBe(204);
  });
});

describe('Deleta usuário /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).delete('/users/' + idCriado);
    expect(response.statusCode).toBe(204);
  });
});

afterAll(() => {
  server.close();
  connection.end();
});