import type { Tables } from '@/app/api/supabase/schema.types';
import type { BodyByMethodType } from '@/app/api/supabase/todo/types/types';

export type TodoSupabase = Tables<'todo Table'>;

export type TodoListSupabase = TodoSupabase[];

export type UpdateTodoTableType<T extends 'PATCH' | 'DELETE'> =
  BodyByMethodType<T>;

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
