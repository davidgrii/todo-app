import React, { useEffect } from 'react'
import { Container } from '@/shared/components/ui'
import { useTodoStore } from '@/shared/store'
import { CreateTodoInput } from '@/shared/components/todolist/ui/create-todo-input'
import { TodoList } from '@/shared/components/todolist/ui/todo-list'

export const TodolistLayout = () => {
  const { fetchTodoLists } = useTodoStore()

  useEffect(() => {
    fetchTodoLists()
  }, [fetchTodoLists])

  return (
    <>
      <Container className={'pt-8'}>
        <h2 className='text-2xl font-bold mb-4 mt-20'>Todolist page</h2>

        <CreateTodoInput />

        <TodoList />
      </Container>
    </>
  )
}
