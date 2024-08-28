'use client';

import { tv } from 'tailwind-variants';
import { memo, useState, useCallback } from 'react';
import AddTodoForm from './AddTodoForm';
import Todo from './Todo';
import type {
  TodoSupabase,
  TodoListSupabase,
  ClientTodoAppProps,
} from './type/type';

const ulFlexVariant = tv({
  base: 'flex flex-col gap-y-2.5',
});
const liGridVariant = tv({
  base: 'grid grid-cols-[auto_minmax(25rem,1fr)_auto_auto] grid-rows-[auto_auto] items-center gap-x-2.5',
});

const MemoizedAddTodoForm = memo(AddTodoForm);
const MemoizedTodo = memo(Todo);

export default function ClientTodoApp({ initialTasks }: ClientTodoAppProps) {
  const [todoList, setTodoList] = useState<TodoListSupabase>(initialTasks);

  const addTodo = useCallback((newTodo: TodoSupabase) => {
    setTodoList((preTodoList) => [...preTodoList, newTodo]);
  }, []);

  const updateTodo = useCallback((updateTodo: TodoSupabase) => {
    setTodoList((preTodoList) =>
      preTodoList.map((preTodo) =>
        preTodo.created_at === updateTodo.created_at ? updateTodo : preTodo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((deleteTodo: TodoSupabase) => {
    setTodoList((preTodoList) =>
      preTodoList.filter(
        (preTodo) => preTodo.created_at !== deleteTodo.created_at,
      ),
    );
  }, []);

  return (
    <>
      <MemoizedAddTodoForm onAddTodo={addTodo} />
      <ul className={ulFlexVariant()}>
        {todoList.map((todo) => (
          <li key={todo.created_at} className={liGridVariant()}>
            <MemoizedTodo
              todo={todo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
