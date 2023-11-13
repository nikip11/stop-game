import { cacheEdit, cacheGet, cacheRemove, cacheSet } from "./cache"
import { checkAnswers } from "./helpers"
import { Answer } from "./types"

interface GameResult {
  [key: string]: {
    value: string
    points: number
    reason?: string
  }
}
export interface User {
  name: string
  ready?: boolean
  points?: number
  totalPoints: number
  answers?: Answer
  lastGameResults?: GameResult
}

const CACHE_KEY_USER = 'users'

export const getUsers = async (): Promise<User[]> => {
  const users = await cacheGet(CACHE_KEY_USER)
  return users.map((user: string) => JSON.parse(user))
}

export const addUser = async (username: string): Promise<User | null> => {
  const users = await getUsers()
  const find = users.find(element => element.name === username)
  if (!find) {
    const user = { name: username, totalPoints: 0 }
    await cacheSet(CACHE_KEY_USER, JSON.stringify(user))
    return user
  }
  return null
}

export const removeUser = async (username: string): Promise<boolean> => {
  const users = await getUsers()
  const index = users.findIndex(element => element.name === username)
  if (index !== -1) {
    await cacheRemove(CACHE_KEY_USER, JSON.stringify(users[index]))
    return true
  }
  return false
}

export const getUser = async (username: string): Promise<User | null> => {
  const users = await getUsers()
  const index = users.findIndex(element => element.name === username)
  if (index !== -1) {
    return users[index]
  }
  return null
}

export const editUser1 = async (username: string, args: {}): Promise<User | null> => {
  const users = await getUsers()
  const index = users.findIndex(element => element.name === username)
  if (index !== -1) {
    const user = { ...users[index], ...args }
    await cacheEdit(CACHE_KEY_USER, index, JSON.stringify(user))
    return user
  }
  return null
}

export const editUser = async (user: User): Promise<User | null> => {
  console.log({ user })
  const users = await getUsers()
  const index = users.findIndex(element => element.name === user.name)
  if (index !== -1) {
    await cacheEdit(CACHE_KEY_USER, index, JSON.stringify(user))
    return user
  }
  return null
}

export const hasMultiUsers = async (): Promise<boolean> => {
  const users = await getUsers()
  return users.filter(user => user.ready).length > 1
}

export const allUserStop = async (): Promise<boolean> => {
  const users = await getUsers()
  return users.every(user => user.answers)
}

export const checkUserAnswers = async (username: string, letter: string, answer: Answer) => {
  const user = await getUser(username)
  if (user) {
    const points = checkAnswers(answer, letter)
    await editUser({ ...user, ready: false, points, answers: answer })
  }
}

export const checkAllUsersAnswer = async (letter: string) => {
  const allAnswers = await allUserStop()
  if (!allAnswers) {
    return
  }
  const users = await getUsers()
  users.forEach(async (user: User) => {
    const answers = user.answers;
    const lastGameResults: GameResult = {};
    user.points = 0

    for (const key in answers) {
      const answer = answers[key].toLowerCase();

      if (!answer || answer === '') {
        lastGameResults[key] = {
          value: answers[key],
          points: 0,
          reason: 'palabra vacía',
        };
        continue;
      }

      if (!answer.startsWith(letter.toLowerCase())) {
        lastGameResults[key] = {
          value: answers[key],
          points: 0,
          reason: 'no empieza con la letra',
        };
        continue;
      }

      if (answer.length <= 3) {
        lastGameResults[key] = {
          value: answers[key],
          points: 0,
          reason: 'la palabra no tiene la logintud mínima',
        };
        continue;
      }

      const repeat = users.find((otherUser) => otherUser.answers![key] === answer && otherUser.name !== user.name);
      if (repeat) {
        user.points += 50;
        lastGameResults[key] = {
          value: answers[key],
          points: 50,
          reason: 'repetida por otro jugador',
        };
        continue;
      }

      lastGameResults[key] = {
        value: answers[key],
        points: 100,
        reason: '',
      };
      user.points += 100;
    }
    user.lastGameResults = lastGameResults;
    user.totalPoints += user.points
    console.log({ user })
    await editUser(user)
  });
}
