import { connectDB } from '@/lib/mongodb'
import { TodoList } from '@/models/todo.model'
import { Task } from '@/models/task.model'

export async function POST(req: Request) {
  const { title, description, listId } = await req.json()

  if (!title || !listId) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400
    })
  }

  await connectDB()

  try {
    const newTask = await Task.create({ title, description, listId })

    await TodoList.findByIdAndUpdate(listId, { $push: { tasks: newTask._id } })

    return new Response(
      JSON.stringify({ message: 'Task created', task: newTask }),
      { status: 201 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create task' }), {
      status: 500
    })
  }
}
