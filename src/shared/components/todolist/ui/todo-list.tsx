import React, { useState } from 'react'
import { useTodoStore } from '@/shared/store'

export const TodoList = () => {
  const [editListName, setEditListName] = useState('')
  const [editingListId, setEditingListId] = useState<string | null>(null)

  const { todoLists, updateTodoList, deleteTodoList, toggleTaskCompletion } = useTodoStore()

  const handleEditTodoList = async () => {
    if (!editListName.trim()) return

    if (editingListId) {
      updateTodoList(editingListId, editListName)

      setEditingListId(null)
      setEditListName('')
    }
  }

  const handleDeleteTodoList = async (id: string) => {
    deleteTodoList(id)
  }

  const handleToggleTask = (taskId: string) => {
    toggleTaskCompletion(taskId)
  }

  return (
    <div className='mt-4'>
      {todoLists.length > 0 && (
        <h2 className='inline-block mb-4'>Available todos:</h2>
      )}

      {todoLists.length === 0 ? (
        <p>No todo lists available.</p>
      ) : (
        <ul>
          {todoLists.map((list, index) => (
            <li
              key={list._id}
              className='flex items-center justify-between mb-2 border rounded py-2.5 px-4'
            >
              <div className={'flex gap-4 items-center'}>
                <input
                  type='checkbox'
                  checked={list.completed ?? false}
                  onChange={() => handleToggleTask(list._id)}
                  className='mr-2 cursor-pointer'
                />

                {editingListId === list._id ? (
                  <input
                    type='text'
                    placeholder='Enter new name'
                    value={editListName}
                    onChange={(e) => setEditListName(e.target.value)}
                    className='border p-1 mr-2 rounded font-medium text-sm'
                  />
                ) : (
                  <span
                    className={`mr-2 ${list.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {index + 1} - {list.name}
                  </span>
                )}
              </div>

              <div>
                <button
                  onClick={() =>
                    editingListId === list._id
                      ? handleEditTodoList()
                      : setEditingListId(list._id)
                  }
                  className='bg-blue-500 text-white px-4 py-1 mr-2 rounded'
                >
                  {editingListId === list._id ? 'Save' : 'Edit'}
                </button>

                {editingListId === list._id ? (
                  <button
                    onClick={() => setEditingListId(null)}
                    className='bg-red-500 text-white px-4 py-1 rounded'
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteTodoList(list._id)}
                    className='bg-red-500 text-white px-4 py-1 rounded'
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
