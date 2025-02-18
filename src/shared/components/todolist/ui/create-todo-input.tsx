import React, { useState } from 'react'
import { useTodoStore } from '@/shared/store'

export const CreateTodoInput = () => {
  const [newListName, setNewListName] = useState('')

  const { addTodoList } = useTodoStore()

  const handleCreateTodoList = async () => {
    if (newListName.trim() === '') return

    addTodoList(newListName)
    setNewListName('')
  }

  return (
    <>
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
    </>
  )
}
