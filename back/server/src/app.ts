import { server } from './routes'
import { io, startIo } from './socket'

io.on('connection', (socket: any) => {
  startIo(socket)
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
