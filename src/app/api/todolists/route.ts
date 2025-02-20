import { connectDB } from '@/lib/db'
import { TodoList } from '@/models/todo.model'
import { ITodoList } from '@/shared/types'
import { NextRequest } from 'next/server'

export async function GET() {
  await connectDB()

  try {
    const todoLists: ITodoList[] = await TodoList.find()

    return new Response(JSON.stringify(todoLists), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch todo lists' }),
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { name, completed } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ error: 'Name is required' }), {
      status: 400
    })
  }

  await connectDB()

  try {
    const newTodoList = new TodoList({ name, completed: completed ?? false })

    await newTodoList.save()

    return new Response(JSON.stringify(newTodoList), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create todo list' }),
      { status: 500 }
    )
  }
}
