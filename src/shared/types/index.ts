import { Document } from 'mongoose'

export interface IFormRegister {
  name: string
  email: string
  password: string
}

export interface IFormLogin {
  email: string
  password: string
}

export interface ITodoList extends Document {
  _id: string
  name: string
  tasks: string[]
}
