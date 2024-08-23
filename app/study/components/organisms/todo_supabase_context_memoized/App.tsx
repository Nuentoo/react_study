import AddTodo from './AddTodo';
import TaskList from './TaskList';
import { TasksProvider } from './contexts/TasksContext';
import TaskSkelton from '@/app/study/ui/TaskSkelton';
import fetcherTodoTable from '@/app/api/supabase/fetcher';

export default async function TaskApp() {
  try {
    const todos = await fetcherTodoTable('GET');
    return (
      <>
        <strong>Data fetch failed ...</strong>
        <TaskSkelton />
      </>
    );
  } catch (error) {
    console.error('Error fetching initial todos:', error);
    return (
      <>
        <strong>Data fetch failed ...</strong>
        <TaskSkelton />
      </>
    );
  }
}
