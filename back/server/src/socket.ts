const socketIo = require('socket.io');
import { getLetter, checkAnswers } from "./helpers";
import { server } from './routes'

export const io = socketIo(server, {
  cors: {
    origin: "*"
  }
})
type User = {
  name: string
  ready?: boolean
  points?: number
  totalPoints?: number
}
const users: User[] = []

let seconds = 0
let timer: NodeJS.Timeout | null = null

type StopProps = {
  answer: {}
  letter: string
  user: string
}

export function startIo(socket: any) {
  io.emit('usersConnected', users)

  socket.on('connectToRoom', (user: string) => {
    const find = users.find(element => element.name === user)
    if (find) {
      socket.emit('User exist')
    }
    users.push({ name: user })
    io.emit('usersConnected', users)
  })

  socket.on('disconnectUser', (user: string) => {
    const index = users.findIndex(element => element.name === user)
    if (index !== -1) {
      users.splice(index, 1)
    }
    console.log({ users, index, user })
    io.emit('usersConnected', users)
  })

  const allReady = users.every(element => element.ready)
  if (allReady) {
    io.emit('allUserReady')
  }

  socket.on('userReady', (user: string) => {
    const find = users.find(element => element.name === user)
    if (find) {
      find.ready = true
    }
    console.log({ users })
    io.emit('usersConnected', users)
  })

  socket.on('start', () => {

    if (!timer) {
      const letter = getLetter()
      timer = setInterval(() => {
        seconds++
        io.emit('seconds', seconds)
        console.log({ seconds })
      }, 1000)
      io.emit('letter', letter)
    }
  })


  socket.on('stop', ({ answer, user, letter }: StopProps) => {
    if (timer !== null) {
      clearInterval(timer)
    }
    timer = null
    seconds = 0
    // console.log({answer, user})
    io.emit('stopGame', user)
    const points = checkAnswers(answer, letter)
    const currentUser = users.find((u: User) => u.name = user)
    currentUser!.points = points

    // console.log({ points })
    // io.emit('points', points)
  })

  // socket.on('disconnect', () => {
  //   console.log('Cliente desconectado');
  // socket.disconnect();
  // });
}
