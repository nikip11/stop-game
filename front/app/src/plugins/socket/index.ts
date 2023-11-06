import { reactive } from "vue"
import { io } from "socket.io-client"

type Props = {
    connected: boolean
    letter: string | null
    room: string | null
    start: () => void
    users: []
}

export const state = reactive<Props>({
  connected: false,
  letter: null,
  room: null,
  start: () => {},
  users: []
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"

export const socket = io(URL)

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
  state.users = args
})

// state.start = () => {
//     socket.emit('startGame')
// }

