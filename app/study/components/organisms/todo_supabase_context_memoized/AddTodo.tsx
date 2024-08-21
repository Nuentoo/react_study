'use client';

import { memo, useState, useRef, useCallback } from 'react';
import styled from 'styled-components'
import { useSetTodosContext } from './contexts/TasksContext';
import StyledInputText from '../../atoms/StyledInputText';
import { StyledBlueButton } from '../../atoms/StyledButton';
import fetcherTodoTable from '@/app/api/supabase/fetcher';

const MemoizedStyledInputText = memo(StyledInputText)

const DivFlex = styled.div`
	display: flex;
	column-gap: 10px;
	align-items: center;
`;

export default function AddTodo() {
	// console.log('Add Todo 再レンダリング？？？')
	const setTodos = useSetTodosContext();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const handleChangeInput = useCallback(() => {
		if (!inputRef.current) return;
		setIsDisabled(!inputRef.current.value);
	}, [])

	const handleAddTodo = async () => {
		if (!inputRef.current || !inputRef.current.value) return;
		try {
			setIsDisabled(true);
			await fetcherTodoTable('POST', {title: inputRef.current.value, done: false});
			const insertedTodos = await fetcherTodoTable('GET');
			inputRef.current.value = '';
			setTodos(insertedTodos);
		} catch (error) {
			console.error('Error fetching add todos:', error);
		} finally {
			setIsDisabled(!inputRef.current.value);
		}
	};

	return (
		<DivFlex>
			<MemoizedStyledInputText
				placeholder="Add Todo"
				defaultValue=""
				ref={inputRef}
				onChange={handleChangeInput}
			/>
			<StyledBlueButton
				onClick={handleAddTodo}
				disabled={isDisabled}
			>
				Add
			</StyledBlueButton>
		</DivFlex>
	)
};