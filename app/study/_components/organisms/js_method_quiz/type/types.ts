import { SetStateAction } from 'react';
import type { CurrentQuizStore } from '../modules/utils';
import type {
  QuizCategory,
  QuizSupabase,
  BodyByMethodType,
} from '@/_utils/supabase/public_study/quiz/types/types';

export type AnswerStatusType = 'editing' | 'correct' | 'incorrect' | 'timeup';

export type UpdateQuizTableType<T extends 'POST' | 'PATCH' | 'DELETE'> =
  BodyByMethodType<T>;

export type SelectedQuizSupabase<T extends QuizCategory> = {
  category: T;
  correct: string;
  id: number;
  question: string;
};

export type CategorizeGroupType = {
  [T in QuizCategory]: SelectedQuizSupabase<T>[];
};

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export type ClientQuizAppProps = {
  initialData: QuizSupabase[];
};

export type SelectCategoryProps = {
  handleCategorySelect: (category: QuizCategory | 'all') => void;
  handleEditTableDisplay: () => void;
  categoryGroup: CategorizeGroupType;
};

export type QuizFormProps = {
  answerStatus: AnswerStatusType;
  handleInput: () => void;
  handleSubmit: (event: FormSubmitEvent) => void;
  handleTimeUp: () => void;
  handleNextQuiz: () => void;
  handleExitQuiz: () => void;
  currentQuizStore: CurrentQuizStore;
  answerInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export type InfoCardProps = {
  isCorrect: boolean;
  isTimeUp: boolean;
  timeLeft: number;
  setTimeLeft: React.Dispatch<SetStateAction<number>>;
  handleTimeUp: () => void;
  currentQuizStore: CurrentQuizStore;
  answerInputRef: React.MutableRefObject<HTMLInputElement | null>;
  nextButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

export type ScoreProps = {
  currentQuizStore: CurrentQuizStore;
  handleReturnMenu: () => void;
};

export type EditTableListProps = {
  editTableData: QuizSupabase[];
  onAddQuiz: (value: QuizSupabase) => void;
  onUpdateQuiz: (value: QuizSupabase) => void;
  onDeleteQuiz: (value: QuizSupabase) => void;
  handleEditTableDisplay: () => void;
};

export type EditTableItemProps = {
  quiz: QuizSupabase;
  onAddQuiz: (value: QuizSupabase) => void;
  onUpdateQuiz: (value: QuizSupabase) => void;
  onDeleteQuiz: (value: QuizSupabase) => void;
};
