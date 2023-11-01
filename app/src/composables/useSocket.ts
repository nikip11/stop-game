import { useTimerStore } from "@/store/useTimerStore"
import { User } from "@/helper"
import { io } from "socket.io-client"
import { reactive } from "vue"
import { useStorage } from "./useStorage"
import { FormInputs } from "@/types"

type StateProps = {
  connected: boolean
  letter: string | null
  seconds: number
  room: string | null
  start: () => void
  connectedUsers: []
  disabled: boolean
  userStop: string
  points: number
}

type ResponseSocket = {
  state: StateProps,
  connectUser: (user: User) => void,
  connectToRoom: (user: User, room: string) => void
  userPrepared: (user: User) => void
  disconnectUser: (user: User) => void
  start: () => void
  stop: (formValue: FormInputs) => void
}

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"
const socket = io(URL)

export function useSocket(): ResponseSocket {
  const store = useTimerStore()
  const user = useStorage('user')

  const state = reactive<StateProps>({
    connected: false,
    letter: null,
    seconds: 0,
    room: null,
    start: () => {},
    connectedUsers: [],
    disabled: false,
    userStop: '',
    points: 0
  })


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
    state.disabled = false
  }

  const stop = (formValue: FormInputs) => {
    console.log({answer: formValue})
    socket.emit('stop', {answer: formValue, user: user.value, letter: state.letter})
  }

  socket.on('stopGame', (user) => {
    state.disabled = true
    state.userStop = user
  })

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
    console.log({room})
    socket.emit('connectToRoom', user)
  }

  const userPrepared = (user: User) => {
    socket.emit('userPrepared', user)
  }

  // temporales
  socket.on('points', (points: number) => {
    state.points = points
  })

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
