import StyledSection from './components/templates/StyledSection';
import { Suspense } from 'react';
import TaskSkelton from './ui/TaskSkelton';
import TaskApp from './components/organisms/todo_supabase_context_memoized/App';
// import TaskApp from './components/organisms/todo_reducer/App';
import GrabBox from './components/organisms/grab_box/App';

export default async function Page() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ fontFamily: 'Meiryo Arial', flexDirection: 'column' }}
    >
      <StyledSection legendName="todo supabase">
        <Suspense fallback={<TaskSkelton />}>
          <TaskApp />
        </Suspense>
      </StyledSection>
      <StyledSection legendName="grab box">
        <GrabBox />
      </StyledSection>
    </main>
  );
}
