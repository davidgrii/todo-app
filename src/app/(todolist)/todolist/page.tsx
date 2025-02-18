'use client'

import React, { useEffect, useState } from 'react'
import { useTodoStore } from '@/shared/store'
import { Container } from '@/shared/components/ui'

export default function TodoListPage() {
  const {
    todoLists,
    addTodoList,
    updateTodoList,
    deleteTodoList,
    fetchTodoLists
  } = useTodoStore()

  const [newListName, setNewListName] = useState('')
  const [editListName, setEditListName] = useState('')
  const [editingListId, setEditingListId] = useState<string | null>(null)

  useEffect(() => {
    fetchTodoLists()
  }, [fetchTodoLists])

  const handleCreateTodoList = async () => {
    if (newListName.trim() === '') return

    addTodoList(newListName)
    setNewListName('')
  }

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

  return (
    <Container>
      <h1 className='text-xl font-bold mb-4'>Todo Lists</h1>

      <div className={'flex flex-col'}>
        <input
          type='text'
          placeholder='Enter name'
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className='border p-2 mb-2 rounded font-medium'
        />
        <button
          onClick={handleCreateTodoList}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Create List
        </button>
      </div>

      <div className='mt-4'>
        <h2 className={'inline-block mb-4'}>Available todos:</h2>

        {todoLists.length === 0 ? (
          <p>No todo lists available.</p>
        ) : (
          <ul>
            {todoLists.map((list, index) => (
              <li
                key={list._id}
                className='flex items-center justify-between mb-2 border rounded p-2.5'
              >
                {editingListId === list._id ? (
                  <input
                    type='text'
                    value={editListName}
                    onChange={(e) => setEditListName(e.target.value)}
                    className='border p-2 mr-2'
                  />
                ) : (
                  <span className='mr-2'>
                    {index + 1} - {list.name}
                  </span>
                )}

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

                  <button
                    onClick={() => handleDeleteTodoList(list._id)}
                    className='bg-red-500 text-white px-4 py-1 rounded'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  )
}
