import { model, models, Schema } from 'mongoose'

const todoListSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const TodoList = models.TodoList || model('TodoList', todoListSchema)
