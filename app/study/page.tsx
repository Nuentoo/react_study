import StyledSection from './components/templates/StyledSection';
import { Suspense } from 'react';
import SeverTodoApp from './components/organisms/todo/App';
import TaskSkelton from './ui/TaskSkelton';
import GrabBox from './components/organisms/grab_box/App';
import SeverQuizApp from './components/organisms/js_method_quiz/App';
import QuizMenuSkelton from './ui/QuizMenuSkelton';

export default async function Page() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ fontFamily: 'Meiryo Arial', flexDirection: 'column' }}
    >
      <StyledSection legendName="todo supabase">
        <Suspense fallback={<TaskSkelton />}>
          <SeverTodoApp />
        </Suspense>
      </StyledSection>
      <StyledSection legendName="grab box">
        <GrabBox />
      </StyledSection>
      <StyledSection legendName="js method quiz">
        <Suspense fallback={<QuizMenuSkelton />}>
          <SeverQuizApp />
        </Suspense>
      </StyledSection>
    </main>
  );
}
