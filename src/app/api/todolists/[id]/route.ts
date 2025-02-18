import { connectDB } from '@/lib/mongodb'
import { TodoList } from '@/models/todo.model'
import { ITodoList } from '@/shared/types'

export async function PUT({ params }: { params: { id: string } }) {
  const { id } = params

  await connectDB()

  try {
    const todoList: ITodoList | null = await TodoList.findById(id)

    if (!todoList) {
      return new Response(JSON.stringify({ error: 'Todo list not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify(todoList), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch todo list' }),
      { status: 500 }
    )
  }
}
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400
    })
  }

  await connectDB()

  try {
    const deletedTodoList = await TodoList.findByIdAndDelete(id)

    if (!deletedTodoList) {
      console.error(`Todo list with ID ${id} not found`)
      return new Response(JSON.stringify({ error: 'Todo list not found' }), {
        status: 404
      })
    }

    console.log(`Todo list with ID ${id} deleted successfully`)
    return new Response(JSON.stringify({ message: 'Todo list deleted' }), {
      status: 200
    })
  } catch (error) {
    console.error('Error in DELETE:', error) // Логируем ошибку
    return new Response(
      JSON.stringify({ error: 'Failed to delete todo list' }),
      { status: 500 }
    )
  }
}
