import {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from 'react';
import Spinner from '@/app/study/_ui/Spinner';
import StyledInputText from '../../atoms/StyledInputText';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import fetcherQuizTable from '@/_utils/supabase/public_study/quiz/fetcher';
import type { CustomError } from '@/_utils/supabase/public_study/quiz/fetcher';
import { QuizSupabase } from '@/_utils/supabase/public_study/quiz/types/types';
import type { EditTableItemProps, UpdateQuizTableType } from './type/types';

const MemoizedVariantsButton = memo(VariantsButton);
const MemoizedStyledInputText = memo(StyledInputText);

export default function EditTableItem({
  quiz,
  onAddQuiz,
  onUpdateQuiz,
  onDeleteQuiz,
}: EditTableItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isDuplicateError, setIsDuplicateError] = useState<boolean>(false);

  const questionInputRef = useRef<HTMLInputElement | null>(null);
  const correctInputRef = useRef<HTMLInputElement | null>(null);

  const isNewTable = !(quiz.question && quiz.correct);

  useEffect(() => {
    if (!isNewTable) return;
    setIsEditing(true);
    setIsDisabled(true);
  }, [isNewTable]);

  const handleFillText = useCallback(() => {
    setIsDisabled(
      !(
        questionInputRef.current?.value.trim() &&
        correctInputRef.current?.value.trim()
      ),
    );
  }, []);

  const handleEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const updateQuizTable = useCallback(
    async <T extends 'POST' | 'PATCH' | 'DELETE'>(
      type: T,
      updateQuiz: UpdateQuizTableType<T>,
    ) => {
      try {
        setIsLoading(true);
        const [operatedQuiz] = await fetcherQuizTable(type, updateQuiz);
        if (type === 'POST') {
          onAddQuiz(operatedQuiz);
        } else if (type === 'PATCH') {
          onUpdateQuiz(operatedQuiz);
        } else if (type === 'DELETE') {
          onDeleteQuiz(operatedQuiz);
        }
      } catch (error) {
        const customError = error as CustomError;
        setIsEditing(true);
        console.error(`Error fetching ${type} quiz:`, error);
        if (customError.code === 409) {
          setIsDuplicateError(true);
          setIsDisabled(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [onAddQuiz, onUpdateQuiz, onDeleteQuiz],
  );

  const handleSaveQuiz = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!questionInputRef.current || !correctInputRef.current) return;
      setIsEditing(false);
      const questionValue = questionInputRef.current.value;
      const correctValue = correctInputRef.current.value;
      if (quiz.question === questionValue && quiz.correct === correctValue)
        return;
      const requestMethod = isNewTable ? 'POST' : 'PATCH';
      const updateQuiz: QuizSupabase = {
        ...quiz,
        question: questionValue,
        correct: correctValue,
      };
      updateQuizTable(requestMethod, updateQuiz);
    },
    [isNewTable, quiz, updateQuizTable],
  );

  const handleDeleteQuiz = useCallback(() => {
    updateQuizTable('DELETE', quiz.id);
  }, [quiz.id, updateQuizTable]);

  const quizContent = isEditing ? (
    <>
      <MemoizedStyledInputText
        placeholder="quiz"
        required
        defaultValue={quiz.question}
        ref={questionInputRef}
        onChange={handleFillText}
      />
      <MemoizedStyledInputText
        placeholder={isDuplicateError ? '× duplicate' : 'correct'}
        pattern="[a-zA-Z]*"
        required
        defaultValue={isDuplicateError ? '' : quiz.correct}
        ref={correctInputRef}
        onChange={handleFillText}
      />
      <div>
        <MemoizedVariantsButton
          type="submit"
          disabled={isDisabled}
          className={buttonStyles({ color: isNewTable ? 'blue' : 'orange' })}
        >
          {isNewTable ? 'Add' : 'Save'}
        </MemoizedVariantsButton>
      </div>
    </>
  ) : (
    <>
      <p>{quiz.question}</p>
      <p>{quiz.correct}</p>
      <div>
        <VariantsButton
          type="button"
          onClick={handleEditing}
          className={buttonStyles({ color: 'green' })}
        >
          Edit
        </VariantsButton>
      </div>
    </>
  );

  return (
    <>
      {isLoading ? (
        <>
          <div className="h-[4px]"></div>
          <Spinner />
        </>
      ) : (
        <form
          onSubmit={handleSaveQuiz}
          className="grid grid-cols-[33px_minmax(60px,auto)_minmax(25rem,1fr)_auto_auto_auto] grid-rows-[auto_auto] items-center gap-x-2.5"
        >
          <p>{quiz.id}</p>
          <p>{quiz.category}</p>
          {quizContent}
          <MemoizedVariantsButton
            type="button"
            disabled={isNewTable}
            onClick={handleDeleteQuiz}
            className={buttonStyles({ color: 'red' })}
          >
            Delete
          </MemoizedVariantsButton>
        </form>
      )}
    </>
  );
}
