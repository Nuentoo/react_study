import { memo, useState, useRef, useMemo, useCallback } from 'react';
import { useSetTodosContext } from './contexts/TasksContext';
import TodoSkelton from '../../../ui/TodoSkelton';
import StyledInputText from '../../atoms/StyledInputText';
import StyledCheckbox from '../../atoms/StyledCheckbox';
import {
  StyledRedButton,
  StyledGreenButton,
  StyledOrangeButton,
} from '../../atoms/StyledButton';
import fetcherTodoTable from '@/app/api/supabase/fetcher';
import type { TodoSupabase } from './type/type';

const MemoizedStyledCheckbox = memo(StyledCheckbox);
const MemoizedStyledRedButton = memo(StyledRedButton);
const MemoizedStyledGreenButton = memo(StyledGreenButton);
const MemoizedStyledInputText = memo(StyledInputText);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export default function Task({ created_at, done, id, title }: TodoSupabase) {
  // console.log(`${title}  再レンダリング???`)
  const todo = useMemo(
    () => ({ created_at, done, id, title }),
    [created_at, done, id, title],
  ); // ん〜…
  const setTodos = useSetTodosContext();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const editInputRef = useRef<HTMLInputElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleChangeTitle = useCallback(() => {
    if (!editInputRef.current) return;
    setIsDisabled(!editInputRef.current.value.trim());
  }, []);

  const updateTodoTables = useCallback(
    async (
      type: 'PATCH' | 'DELETE',
      nextTodo: TodoSupabase | TodoSupabase['created_at'],
    ) => {
      try {
        setIsLoading(true);
        await fetcherTodoTable(type, nextTodo);
        const updatedTodos = await fetcherTodoTable('GET');
        setTodos(updatedTodos);
      } catch (error) {
        // do nothing
        console.error(`Error fetching ${type} todos:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [setTodos],
  );

  const handleSaveTodo = useCallback(() => {
    if (!editInputRef.current) return;
    // console.log('Saveボタン押下')
    setIsEditing(false);
    const nextTodo: TodoSupabase = {
      ...todo,
      title: editInputRef.current.value,
    };
    updateTodoTables('PATCH', nextTodo);
  }, [todo, updateTodoTables]);

  const handleCheckTodo = useCallback(() => {
    if (!checkboxRef.current) return;
    const nextTodo: TodoSupabase = {
      ...todo,
      done: checkboxRef.current.checked,
    };
    updateTodoTables('PATCH', nextTodo);
  }, [todo, updateTodoTables]);

  const handleEditting = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDeleteTodo = useCallback(async () => {
    updateTodoTables('DELETE', created_at);
  }, [created_at, updateTodoTables]);

  const todoContent = isEditing ? (
    <>
      <MemoizedStyledInputText
        defaultValue={title}
        ref={editInputRef}
        onChange={handleChangeTitle}
      />
      <div className="row-span-full col-start-3">
        <StyledOrangeButton onClick={handleSaveTodo} disabled={isDisabled}>
          Save
        </StyledOrangeButton>
      </div>
    </>
  ) : (
    <>
      <pre>{title}</pre>
      <div className="row-span-full col-start-3">
        <MemoizedStyledGreenButton onClick={handleEditting}>
          Edit
        </MemoizedStyledGreenButton>
      </div>
    </>
  );
  return (
    <>
      {isLoading ? (
        <TodoSkelton />
      ) : (
        <>
          <div className="row-span-full">
            <MemoizedStyledCheckbox
              checked={done}
              ref={checkboxRef}
              onChange={handleCheckTodo}
            />
          </div>
          {todoContent}
          <div className="row-span-full col-start-4">
            <MemoizedStyledRedButton onClick={handleDeleteTodo}>
              Delete
            </MemoizedStyledRedButton>
          </div>
          <p className="col-start-2 row-start-2">
            <small>post: {formatDate(created_at)}</small>
          </p>
        </>
      )}
    </>
  );
}
