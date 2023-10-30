const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:8000"
//     }
// })

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8000"
  }
})

function getRoom() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 5;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function getLetter(){
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}
const users = []

// interface User {
//  name: string
//  ok: boolean
//  points: number
// }

let seconds = 0
let timer = null

io.on('connection', (socket) => {
  // const room = getRoom()
  // socket.emit('room', room)

  // const letter = getLetter()
  // socket.emit('letter', letter)

  socket.emit('usersConnected', users)

  socket.on('connectToRoom', (user) => {
    const find = users.find(element => element === user)
    if (find) {
      socket.emit('User exist')
    }
    users.push(user)
    console.log({users})
    socket.emit('usersConnected', users)
  })


  // socket.on('sendAnswers', (answers, user) => {

  // })

  socket.on('disconnectUser', (user) => {
    users.splice(user, 1)
    socket.emit('usersConnected', users)
  })



  // // const startGame = users.every((user) => user.ok)

  // socket.on('startGame', () => {
  //     console.log('startGame')
  //     // start time
  //     // - emit start
  //     socket.emit('startGame')
  //     // emit every secounds to show timer
  // })

  // socket.on('stopGame', () => {
  //     // stop time
  //     // disabled every field
  // })

  // =================
  socket.on('start', () => {
    console.log('start')
    const letter = getLetter()
    if (!timer) {
      timer = setInterval(() => {
        seconds++
        socket.emit('seconds', seconds)
        console.log({seconds})
      }, 1000)
    }
    socket.emit('letter', letter)
    console.log({letter})
  })


  socket.on('stop', () => {
    clearInterval(timer)
    timer = null
    seconds = 0
  })
  // =================


  // socket.on('disconnect', () => {
  //   console.log('Cliente desconectado');
    // socket.disconnect();
  // });
});


server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
