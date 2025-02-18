import React, { useEffect, useState } from 'react'
import { Container } from '@/shared/components/ui'
import { useTodoStore } from '@/shared/store'
import { CreateTodoInput } from '@/shared/components/auth/todolist/ui/create-todo-input'

export const TodolistLayout = () => {
  const { todoLists, updateTodoList, deleteTodoList, fetchTodoLists } =
    useTodoStore()

  const [editListName, setEditListName] = useState('')
  const [editingListId, setEditingListId] = useState<string | null>(null)

  useEffect(() => {
    fetchTodoLists()
  }, [fetchTodoLists])

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
    <>
      <Container>
        <h2 className='text-2xl font-bold mb-4'>Todolist page</h2>

        <CreateTodoInput />

        <div className='mt-4'>
          <h2 className={'inline-block mb-4'}>Available todos:</h2>

          {todoLists.length === 0 ? (
            <p>No todo lists available.</p>
          ) : (
            <ul>
              {todoLists.map((list, index) => (
                <li
                  key={list._id}
                  className={
                    'flex items-center justify-between mb-2 border rounded py-2.5 px-4'
                  }
                >
                  {editingListId === list._id ? (
                    <input
                      type='text'
                      placeholder={'Enter new name'}
                      value={editListName}
                      onChange={(e) => setEditListName(e.target.value)}
                      className={'border p-1 mr-2 rounded font-medium text-sm'}
                    />
                  ) : (
                    <span className={'mr-2'}>
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
                      className={
                        'bg-blue-500 text-white px-4 py-1 mr-2 rounded'
                      }
                    >
                      {editingListId === list._id ? 'Save' : 'Edit'}
                    </button>

                    {editingListId === list._id ? (
                      <button
                        onClick={() => setEditingListId(null)}
                        className={'bg-red-500 text-white px-4 py-1 rounded'}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteTodoList(list._id)}
                        className={'bg-red-500 text-white px-4 py-1 rounded'}
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
      </Container>
    </>
  )
}
