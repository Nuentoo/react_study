'use client';

import { useState, createContext, useContext } from 'react';
import { TodoSupabase } from '../type/type';

const TodosContext = createContext<TodoSupabase[] | null>(null);
const SetTodosContext = createContext<React.Dispatch<TodoSupabase[]> | null>(
  null,
);

const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

const useSetTodosContext = () => {
  const context = useContext(SetTodosContext);
  if (!context) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context;
};

const TasksProvider: React.FC<{
  initialTodos: TodoSupabase[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => {
  const [todos, setTodos] = useState<TodoSupabase[]>(initialTodos);
  return (
    <TodosContext.Provider value={todos}>
      <SetTodosContext.Provider value={setTodos}>
        {children}
      </SetTodosContext.Provider>
    </TodosContext.Provider>
  );
};

export { useTodosContext, useSetTodosContext, TasksProvider };
