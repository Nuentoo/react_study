import ClientTodoApp from './ClientTodoApp';
import TaskSkelton from '@/app/study/ui/TaskSkelton';
import fetcherTodoTable from '@/app/api/supabase/fetcher';

export default async function SeverTodoApp() {
  try {
    const tasks = await fetcherTodoTable('GET');
    return (
      <>
        <ClientTodoApp initialTasks={tasks} />
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
