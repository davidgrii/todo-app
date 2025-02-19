import { create } from 'zustand'

interface ITodo {
  _id: string
  name: string
  completed: boolean
}

interface ITodoStore {
  todoLists: ITodo[]
  setTodoLists: (lists: ITodo[]) => void
  addTodoList: (name: string) => void
  updateTodoList: (id: string, name: string) => void
  deleteTodoList: (id: string) => void
  fetchTodoLists: () => void
  toggleTaskCompletion: (id: string) => void
}

export const useTodoStore = create<ITodoStore>((set) => ({
  todoLists: [],
  setTodoLists: (lists) => set({ todoLists: lists }),

  addTodoList: async (name) => {
    const res = await fetch('/api/todolists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })

    if (res.ok) {
      const newTodoList = await res.json()
      set((state) => ({ todoLists: [...state.todoLists, newTodoList] }))
    } else {
      alert('Error creating list')
    }
  },

  updateTodoList: async (id, name) => {
    const res = await fetch(`/api/todolists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })

    if (res.ok) {
      const updatedTodoList = await res.json()
      set((state) => ({
        todoLists: state.todoLists.map((list) =>
          list._id === id ? updatedTodoList : list
        )
      }))
    } else {
      alert('Error updating list')
    }
  },

  deleteTodoList: async (id) => {
    const res = await fetch(`/api/todolists/${id}`, { method: 'DELETE' })

    if (res.ok) {
      set((state) => ({
        todoLists: state.todoLists.filter((list) => list._id !== id)
      }))
    } else {
      alert('Error deleting list')
    }
  },

  fetchTodoLists: async () => {
    const res = await fetch('/api/todolists')
    const data = await res.json()
    set({ todoLists: data })
  },

  toggleTaskCompletion: async (id) => {
    set((state) => {
      const updatedLists = state.todoLists.map((list) =>
        list._id === id ? { ...list, completed: !list.completed } : list
      )

      fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !state.todoLists.find((l) => l._id === id)?.completed
        })
      }).catch(() => alert('Error updating completion status'))

      return { todoLists: updatedLists }
    })
  }
}))
