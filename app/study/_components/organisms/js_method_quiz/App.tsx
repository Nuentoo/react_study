import fetcherQuizTable from '@/_utils/supabase/public_study/quiz/fetcher';
import ClientQuizApp from './ClientQuizApp';
import QuizMenuSkelton from '@/app/study/_ui/QuizMenuSkelton';

export default async function SeverQuizApp() {
  try {
    const data = await fetcherQuizTable('GET', null);
    return (
      <>
        <ClientQuizApp initialData={data} />
      </>
    );
  } catch (error) {
    console.error('Error fetching initial quiz:', error);
    return (
      <>
        <p className="mb-3">
          <strong>Data fetch failed ...</strong>
        </p>
        <QuizMenuSkelton />
      </>
    );
  }
}
