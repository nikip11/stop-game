import { useTimerStore } from "@/store/useTimerStore"
import { User } from "@/types"
import { io } from "socket.io-client"
import { reactive, ref } from "vue"

type StateProps = {
  connected: boolean
  letter: string | null
  seconds: number
  room: string | null
  start: () => void
  connectedUsers: []
}

type ResponseSocket = {
  state: StateProps,
  connectUser: (user: User) => void,
  connectToRoom: (user: User, room: string) => void
  userPrepared: (user: User) => void
  disconnectUser: (user: User) => void
  start: () => void
  stop: () => void
}

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"

export function useSocket(): ResponseSocket {
  const store = useTimerStore()

  const state = reactive<StateProps>({
    connected: false,
    letter: null,
    seconds: 0,
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
    store.setLetter(args)
  })

  socket.on('seconds', (args: number) => {
    state.seconds = args
    store.setSeconds(args)
    console.log('seconds', args)
  })

  const start = () => {
    console.log('start from vue')
    socket.emit('start')
  }

  const stop = () => {
    socket.emit('stop')
  }

  // socket.on('room', (args: string) => {
  //   state.room = args
  // })

  socket.on('usersConnected', (args) => {
    state.connectedUsers = args
  })

  const connectUser = (user: User) => {
    socket.emit('connectUser', user)
  }

  const disconnectUser = (user: User) => {
    socket.emit('disconnectUser', user)
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
    stop,
    start,
    connectUser,
    connectToRoom,
    disconnectUser,
    userPrepared
  }
}
