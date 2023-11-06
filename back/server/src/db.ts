import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/stopGame');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

export { db }
