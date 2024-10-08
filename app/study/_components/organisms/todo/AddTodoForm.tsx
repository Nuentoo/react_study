import { tv } from 'tailwind-variants';
import { memo, useState, useRef, useCallback, type FormEvent } from 'react';
import StyledInputText from '../../atoms/StyledInputText';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import fetcherTodoTable from '@/_utils/supabase/public_study/todo/fetcher';
import type { AddTodoFormProps } from './type/type';

const MemoizedStyledInputText = memo(StyledInputText);

const formFlexVariant = tv({
  base: 'flex items-center space-x-2.5',
});

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  // console.log('Add Todo Form 再レンダリング？？？')
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleChangeInput = useCallback(() => {
    if (!inputRef.current) return;
    setIsDisabled(!inputRef.current.value);
  }, []);

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    try {
      setIsDisabled(true);
      const [insertedTodo] = await fetcherTodoTable('POST', {
        title: inputRef.current.value,
        done: false,
      });
      inputRef.current.value = '';
      onAddTodo(insertedTodo);
    } catch (error) {
      console.error('Error fetching add todos:', error);
    } finally {
      inputRef.current.focus();
      setIsDisabled(!inputRef.current.value);
    }
  };

  return (
    <form className={formFlexVariant()} onSubmit={handleAddTodo}>
      <MemoizedStyledInputText
        placeholder="Add Todo"
        defaultValue=""
        style={{ width: '400px' }}
        ref={inputRef}
        onChange={handleChangeInput}
      />
      <VariantsButton
        disabled={isDisabled}
        className={buttonStyles({ color: 'blue' })}
      >
        Add
      </VariantsButton>
    </form>
  );
}
