import type { Tables } from '@/app/api/supabase/schema.types';
import type { Dispatch } from 'react';

export type TodoSupabase = Tables<'todo Table'>;

export type TodoListSupabase = TodoSupabase[];

export type ClientTodoAppProps = {
  initialTasks: TodoSupabase[];
};

export type AddTodoFormProps = {
  onAddTodo: (value: TodoSupabase) => void;
};

export type TodoProps = {
  todo: TodoSupabase;
  onUpdateTodo: (value: TodoSupabase) => void;
  onDeleteTodo: (value: TodoSupabase) => void;
};
