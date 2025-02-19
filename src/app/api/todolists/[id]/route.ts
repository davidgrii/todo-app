import { connectDB } from '@/lib/db'
import { TodoList } from '@/models/todo.model'
import { ITodoList } from '@/shared/types'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params || !params.id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400
    })
  }

  const { id } = await params
  const { name } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ error: 'Name is required' }), {
      status: 400
    })
  }

  await connectDB()

  try {
    const todoList: ITodoList | null = await TodoList.findById(id)

    if (!todoList) {
      return new Response(JSON.stringify({ error: 'Todo list not found' }), {
        status: 404
      })
    }

    todoList.name = name
    await todoList.save()

    return new Response(JSON.stringify(todoList), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch todo list' }),
      { status: 500 }
    )
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  if (!params || !params.id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400
    })
  }

  const { id } = params
  await connectDB()

  try {
    const deletedTodoList: ITodoList | null = await TodoList.findByIdAndDelete(id)

    if (!deletedTodoList) {
      return new Response(JSON.stringify({ error: 'Todo list not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify({ message: 'Todo list deleted' }), {
      status: 200
    })
  } catch (error) {
    console.error('Error in DELETE:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to delete todo list' }),
      { status: 500 }
    )
  }
}
