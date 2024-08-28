import { tv } from 'tailwind-variants';
import { memo, useState, useRef, useCallback, FormEvent } from 'react';
import StyledInputText from '../../atoms/StyledInputText';
import { StyledBlueButton } from '../../atoms/StyledButton';
import fetcherTodoTable from '@/app/api/supabase/fetcher';
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

  const handleAddTodo = async (e: FormEvent) => {
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
        ref={inputRef}
        onChange={handleChangeInput}
      />
      <StyledBlueButton disabled={isDisabled}>Add</StyledBlueButton>
    </form>
  );
}
