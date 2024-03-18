const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "Sql@2000",
  database: process.env.MYSQL_DATABASE || "userdb"
});

connection.connect((err) => {
  
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.json());


app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (name, email) VALUES (?, ?)`;
  connection.query(INSERT_USER_QUERY, [name, email], (err, results) => {
    if (err) throw err;
    res.statusCode = 201;
    res.send('Usuário criado com sucesso');
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const SELECT_USER_QUERY = `SELECT * FROM users WHERE id = ?`;
  connection.query(SELECT_USER_QUERY, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = {app, server, connection};