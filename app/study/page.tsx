import StyledSection from './_components/templates/StyledSection';
import { Suspense } from 'react';
import SeverTodoApp from './_components/organisms/todo/App';
import TaskSkelton from './_ui/TaskSkelton';
import GrabBox from './_components/organisms/grab_box/App';
import SeverQuizApp from './_components/organisms/js_method_quiz/App';
import QuizMenuSkelton from './_ui/QuizMenuSkelton';
import SeverApp from './_components/organisms/messenger/SeverApp';

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
      <StyledSection legendName="messenger">
        <Suspense fallback={<strong>now loading...</strong>}>
          <SeverApp />
        </Suspense>
      </StyledSection>
    </main>
  );
}
