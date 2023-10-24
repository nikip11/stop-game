import { User } from "@/types"
import { io } from "socket.io-client"
import { reactive } from "vue"

type StateProps = {
  connected: boolean
  letter: string | null
  room: string | null
  start: () => void
  connectedUsers: []
}

type ResponseSocket = {
  state: StateProps,
  connectUser: (user: User) => void,
  connectToRoom: (user: User, room: string) => void
  userPrepared: (user: User) => void
}

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"

export function useSocket(): ResponseSocket {
  const state = reactive<StateProps>({
    connected: false,
    letter: null,
    room: null,
    start: () => {},
    connectedUsers: []
  })

  const socket = io(URL)

  socket.on('connect', () => {
    state.connected = true
  })

  socket.on('disconnect', () => {
    state.connected = false
  })

  socket.on('letter', (args: string) => {
    state.letter = args
  })

  socket.on('room', (args: string) => {
    state.room = args
  })

  socket.on('usersConnected', (args) => {
    state.connectedUsers = args
  })

  const connectUser = (user: User) => {
    socket.emit('connectUser', user)
  }

  const connectToRoom = (user: User, room: string) => {
    console.log({user, room})
    socket.emit('connectToRoom', user)
  }

  const userPrepared = (user: User) => {
    socket.emit('userPrepared', user)
  }

  return {
    state,
    connectUser,
    connectToRoom,
    userPrepared
  }
}
