export interface User {
  name: string
  ready?: boolean
  points?: number
  totalPoints?: number
}

export interface FormInputs {
  [key: string]: string
}
