import ClientTodoApp from './ClientTodoApp';
import TaskSkelton from '@/app/study/_ui/TaskSkelton';
import fetcherTodoTable from '@/_utils/supabase/public_study/todo/fetcher';

export default async function SeverTodoApp() {
  try {
    const tasks = await fetcherTodoTable('GET', null);
    return <ClientTodoApp initialTasks={tasks} />;
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
