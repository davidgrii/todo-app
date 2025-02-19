import { connectDB } from '@/lib/db'
import { TodoList } from '@/models/todo.model'

export async function PUT({ params }: { params: { id: string } }) {
  if (!params) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400
    })
  }

  const { id } = await params

  try {
    await connectDB()

    const task = await TodoList.findById(id)

    if (!task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), {
        status: 404
      })
    }

    task.completed = !task.completed

    await task.save()

    return new Response(JSON.stringify({ message: 'Task updated', task }), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update task' }), {
      status: 500
    })
  }
}
