const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*"
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

function checkAnswers(answers, letter) {
  const totalPoints = [];
  Object.entries(answers).forEach(([key, value]) => {
    const valid = startWith(value, letter);
    const points = valid ? 100 : 0;
    console.log({ key, value, valid, points });
    totalPoints.push(points);
  });
  return totalPoints.reduce((a, b) => a + b, 0);
}

function startWith(name, initialLetter) {
  const escapedInitialLetter = initialLetter.toLowerCase().replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
  const regex = new RegExp(`^${escapedInitialLetter}[A-Za-z]{2,}$`);
  return regex.test(name.toLowerCase());
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
  io.emit('usersConnected', users)

  socket.on('connectToRoom', (user) => {
    const find = users.find(element => element === user)
    if (find) {
      socket.emit('User exist')
    }
    users.push(user)
    io.emit('usersConnected', users)
  })

  socket.on('disconnectUser', (user) => {
    users.splice(user, 1)
    io.emit('usersConnected', users)
  })

  socket.on('start', () => {
    const letter = getLetter()
    if (!timer) {
      timer = setInterval(() => {
        seconds++
        io.emit('seconds', seconds)
        console.log({seconds})
      }, 1000)
    }
    io.emit('letter', letter)
  })


  socket.on('stop', ({answer, user, letter}) => {
    clearInterval(timer)
    timer = null
    seconds = 0
    // console.log({answer, user})
    io.emit('stopGame', user)
    const points = checkAnswers(answer, letter)
    console.log({points})
    io.emit('points', points)
  })

  // socket.on('disconnect', () => {
  //   console.log('Cliente desconectado');
    // socket.disconnect();
  // });
});


server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
