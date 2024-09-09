import { memo, useState, useRef, useCallback } from 'react';
import TodoSpinner from '../../../ui/TodoSpinner';
import StyledInputText from '../../atoms/StyledInputText';
import StyledCheckbox from '../../atoms/StyledCheckbox';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import fetcherTodoTable from '@/app/api/supabase/todo/fetcher';
import type { TodoProps, TodoSupabase, UpdateTodoTableType } from './type/type';

const MemoizedStyledCheckbox = memo(StyledCheckbox);
const MemoizedVariantsButton = memo(VariantsButton);
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

export default function Todo({ todo, onUpdateTodo, onDeleteTodo }: TodoProps) {
  // console.log(`${todo.title} Todo 再レンダリング？？？`);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const editInputRef = useRef<HTMLInputElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleFillTitle = useCallback(() => {
    if (!editInputRef.current) return;
    setIsDisabled(!editInputRef.current.value.trim());
  }, []);

  const handleEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const updateTodoTables = useCallback(
    async <T extends 'PATCH' | 'DELETE'>(
      type: T,
      updateData: UpdateTodoTableType<T>,
    ) => {
      try {
        setIsLoading(true);
        const [operatedTodo] = await fetcherTodoTable(type, updateData);
        if (type === 'PATCH') {
          onUpdateTodo(operatedTodo);
        } else if (type === 'DELETE') {
          onDeleteTodo(operatedTodo);
        }
      } catch (error) {
        // do nothing
        console.error(`Error fetching ${type} todos:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [onUpdateTodo, onDeleteTodo],
  );

  const handleSaveTodo = useCallback(() => {
    if (!editInputRef.current) return;
    setIsEditing(false);
    const currentTitle = editInputRef.current.value;
    if (todo.title === currentTitle) return;
    const updateTodo: TodoSupabase = {
      ...todo,
      title: currentTitle,
    };
    updateTodoTables('PATCH', updateTodo);
  }, [todo, updateTodoTables]);

  const handleCheckTodo = useCallback(() => {
    if (!checkboxRef.current) return;
    const updateTodo: TodoSupabase = {
      ...todo,
      done: checkboxRef.current.checked,
    };
    updateTodoTables('PATCH', updateTodo);
  }, [todo, updateTodoTables]);

  const handleDeleteTodo = useCallback(() => {
    updateTodoTables('DELETE', todo.created_at);
  }, [todo, updateTodoTables]);

  const todoContent = isEditing ? (
    <>
      <MemoizedStyledInputText
        defaultValue={todo.title}
        ref={editInputRef}
        onChange={handleFillTitle}
      />
      <div className="col-start-3 row-span-full">
        <MemoizedVariantsButton
          onClick={handleSaveTodo}
          disabled={isDisabled}
          className={buttonStyles({ color: 'orange' })}
        >
          Save
        </MemoizedVariantsButton>
      </div>
    </>
  ) : (
    <>
      <pre>{todo.title}</pre>
      <div className="col-start-3 row-span-full">
        <MemoizedVariantsButton
          onClick={handleEditing}
          className={buttonStyles({ color: 'green' })}
        >
          Edit
        </MemoizedVariantsButton>
      </div>
    </>
  );

  return (
    <>
      {isLoading ? (
        <TodoSpinner />
      ) : (
        <>
          <div className="row-span-full">
            <MemoizedStyledCheckbox
              checked={todo.done}
              ref={checkboxRef}
              onChange={handleCheckTodo}
            />
          </div>
          {todoContent}
          <div className="col-start-4 row-span-full">
            <MemoizedVariantsButton
              onClick={handleDeleteTodo}
              className={buttonStyles({ color: 'red' })}
            >
              Delete
            </MemoizedVariantsButton>
          </div>
          <p className="col-start-2 row-start-2">
            <small>post: {formatDate(todo.created_at)}</small>
          </p>
        </>
      )}
    </>
  );
}
