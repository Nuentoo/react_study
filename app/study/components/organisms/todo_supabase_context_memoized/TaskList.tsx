'use client';

import { memo } from 'react';
import styled from 'styled-components';
import { useTodosContext } from './contexts/TasksContext';
import Task from './Task';

const UlFlex = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const LiGrid = styled.li`
  column-gap: 10px;
  display: grid;
  grid-template-columns: auto minmax(25rem, 1fr) auto auto;
  grid-template-rows: auto auto;
  align-items: center;
`;

const MemoizedTask = memo(Task);

export default function TaskList() {
  const todos = useTodosContext();

  return (
    <UlFlex>
      {todos.map((todo) => (
        <LiGrid key={todo.created_at}>
          <MemoizedTask
            key={todo.created_at}
            created_at={todo.created_at}
            done={todo.done}
            id={todo.id}
            title={todo.title}
          />
        </LiGrid>
      ))}
    </UlFlex>
  );
}
