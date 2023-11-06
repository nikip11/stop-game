import express from 'express';
const http = require('http');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

export { app, server }
