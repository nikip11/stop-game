const socketIo = require('socket.io');
import { getLetter, checkAnswers } from "./helpers";
import { server } from './routes'
import { addUser, allUserStop, checkAllUsersAnswer, checkUserAnswers, editUser, getUser, getUsers, hasMultiUsers, removeUser, User } from "./user";

export const io = socketIo(server, {
  cors: {
    origin: "*"
  }
})

let seconds = 0
let timer: NodeJS.Timeout | null = null

type StopProps = {
  answer: {}
  letter: string
  username: string
}

export async function startIo(socket: any) {
  const users = await getUsers()
  io.emit('usersConnected', users)

  socket.on('connectToRoom', async (username: string) => {
    if (username !== '') {
      await addUser(username)
    }
    const users = await getUsers()
    io.emit('usersConnected', users)
  })

  socket.on('disconnectUser', async (user: string) => {
    await removeUser(user)
    const users = await getUsers()
    io.emit('usersConnected', users)
  })

  const allReady = users.every(element => element.ready)
  if (allReady) {
    io.emit('allUserReady')
  }

  socket.on('userReady', async (username: string) => {
    const user = await getUser(username)
    if (user) {
      await editUser({ ...user, ready: true, answers: undefined })
    }
    const users = await getUsers()
    console.log({ users, user })
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


  socket.on('stop', (user: string) => {
    if (timer !== null) {
      clearInterval(timer)
    }
    timer = null
    seconds = 0
    io.emit('stopGame', user)
  })

  socket.on('sendAnswers', async ({ answer, username, letter }: StopProps) => {
    const checkMultiUsers = await hasMultiUsers()
    console.log({ checkMultiUsers })

    const user = await getUser(username)
    if (user) {
      await editUser({ ...user, ready: false, answers: answer })
    }

    await checkAllUsersAnswer(letter)

    // if (checkMultiUsers) {
    //   await checkAllUsersAnswer(letter)
    // } else {
    //   await checkUserAnswers(username, letter, answer)
    // }
    const users = await getUsers()
    console.log({ users })
    io.emit('usersConnected', users)
  })



  // socket.on('disconnect', () => {
  //   console.log('Cliente desconectado');
  // socket.disconnect();
  // });
}
