import {
  QuizCategory,
  QuizSupabase,
} from '@/app/api/supabase/quiz/types/types';
import { CATEGORY_ID, INIT_CATEGORY_GROUP } from './constant';
import type { CategorizeGroupType, SelectedQuizSupabase } from '../type/types';

export class CurrentQuizStore {
  private _current: number;
  private readonly _total: number;
  private readonly _selectedQuizzes: SelectedQuizSupabase<QuizCategory>[];
  private _score: boolean[];

  constructor(selectedQuizzes: SelectedQuizSupabase<QuizCategory>[]) {
    this._current = 1;
    this._total = selectedQuizzes.length;
    this._selectedQuizzes = selectedQuizzes;
    this._score = [];
  }
  incrementCurrent() {
    this._current++;
  }
  pushToScore(isCorrect: boolean) {
    this._score.push(isCorrect);
  }
  get current() {
    return this._current;
  }
  get total() {
    return this._total;
  }
  get isLastQuiz() {
    return this._current === this._total;
  }
  get selectedQuizzes() {
    return this._selectedQuizzes;
  }
  get currentQuiz() {
    return this._selectedQuizzes[this._current - 1];
  }
  get score() {
    return this._score;
  }
  get hasScore() {
    return this._score.length > 0;
  }
  get numberOfCorrect() {
    return this._score.filter(Boolean).length;
  }
  get currentScoreRate() {
    const correctLength = this._score.filter(Boolean).length;
    return `${correctLength ? Math.floor((correctLength / this._score.length) * 100) : 0}%`;
  }
  get correctAnswerFraction() {
    return `${this._score.filter(Boolean).length} / ${this._score.length}`;
  }
}

export const categorizeGroupe = (
  quizArray: QuizSupabase[],
): CategorizeGroupType => {
  return quizArray.reduce<CategorizeGroupType>(
    (acc, quiz) => {
      const key = quiz.category;
      const curGroup = acc[key] ?? [];
      return { ...acc, [key]: [...curGroup, quiz] };
    },
    { ...INIT_CATEGORY_GROUP },
  );
};

const shuffleSort = (quizArray: QuizSupabase[]) => {
  let array = [...quizArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createQuiz = (
  category: QuizCategory | 'all',
  categoryGroup: CategorizeGroupType,
  num: number,
): SelectedQuizSupabase<QuizCategory>[] => {
  const unAnswedCategoryData =
    category === 'all'
      ? Object.values(categoryGroup).flat()
      : categoryGroup[category];
  const shuffleData = shuffleSort(unAnswedCategoryData);

  return shuffleData.slice(0, num);
};

const getSequentialId = (arr: number[], category: QuizCategory): number => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return arr[i - 1] + 1;
    }
  }
  return arr.length ? arr[arr.length - 1] + 1 : CATEGORY_ID[category].startId;
};

export const editSupabaseData = (allQuizList: QuizSupabase[]) => {
  let editNewQuiz: QuizSupabase[] = [];
  const groupData = categorizeGroupe(allQuizList);
  const categories = Object.keys(groupData) as QuizCategory[];
  for (const category of categories) {
    const numberArray: number[] = [];
    const categorizedQuizzes = groupData[category];
    categorizedQuizzes.sort((a, b) => a.id - b.id);
    for (const [index, quiz] of categorizedQuizzes.entries()) {
      numberArray[index] = quiz.id;
    }
    const newId = getSequentialId(numberArray, category);
    if (newId > CATEGORY_ID[category].endId) continue;
    const addEmptyQuiz = {
      id: newId,
      category: category,
      question: '',
      correct: '',
    };
    editNewQuiz.push(addEmptyQuiz);
  }
  return [...allQuizList, ...editNewQuiz].sort((a, b) => a.id - b.id);
};

export const randomSelect = (array: readonly string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
