import { useTimerStore } from "@/store/useTimerStore"
import type { User } from "@/types"
import { io } from "socket.io-client"
import { reactive } from "vue"
import { useStorage } from "./useStorage"
import { FormInputs } from "@/types"

type StateProps = {
  connected: boolean
  letter: string | null
  seconds: number
  room: string | null
  connectedUsers: User[]
  disabled: boolean
  userStop: string
  points: number
}

type ResponseSocket = {
  state: StateProps,
  connectUser: (user: string) => void,
  connectToRoom: (user: string, room: string) => void
  userPrepared: (user: string) => void
  disconnectUser: (user: string) => void
  start: () => void
  stop: () => void
  sendAnswers: (formValue: FormInputs) => void
  userReady: (user: string) => void
}

const URL = process.env.NODE_ENV === "production" ? undefined : "http://192.168.4.35:3000"
const socket = io(URL)

export function useSocket(): ResponseSocket {
  const store = useTimerStore()
  const user = useStorage('user')

  const state = reactive<StateProps>({
    connected: false,
    letter: null,
    seconds: 0,
    room: null,
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
  })

  socket.on('usersConnected', (args) => {
    state.connectedUsers = args
  })

  socket.on('stopGame', (user) => {
    state.disabled = true
    state.userStop = user
  })

  const start = () => {
    socket.emit('start')
    state.disabled = false
  }

  const stop = () => {
    socket.emit('stop', user.value)
  }

  const connectUser = (user: string) => {
    socket.emit('connectUser', user)
  }

  const disconnectUser = (user: string) => {
    socket.emit('disconnectUser', user)
  }

  const connectToRoom = (user: string, room: string) => {
    socket.emit('connectToRoom', user)
  }

  const userPrepared = (user: string) => {
    socket.emit('userPrepared', user)
  }

  const userReady = (user: string) => {
    socket.emit('userReady', user)
  }

  const sendAnswers = (formValue: FormInputs) => {
    console.log({ answer: formValue, user: user.value, letter: state.letter })
    socket.emit('sendAnswers', { answer: formValue, username: user.value, letter: state.letter })
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
    userPrepared,
    userReady,
    sendAnswers
  }
}
