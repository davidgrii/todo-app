import { model, models, Schema, Types } from 'mongoose'

const todoListSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: 'Task'
      }
    ],
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const TodoList = models.TodoList || model('TodoList', todoListSchema)
