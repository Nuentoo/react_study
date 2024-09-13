'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import SelectCategory from './SelectCategory';
import AnswerForm from './AnswerForm';
import EditTableList from './EditTableList';
import Score from './Score';
import {
  CurrentQuizStore,
  categorizeGroupe,
  createQuiz,
  editSupabaseData,
} from './modules/utils';
import type {
  QuizCategory,
  QuizSupabase,
} from '@/app/api/supabase/quiz/types/types';
import type {
  AnswerStatusType,
  CategorizeGroupType,
  ClientQuizAppProps,
  FormSubmitEvent,
} from './type/types';

let currentQuizStore: CurrentQuizStore;

export default function ClientQuizApp({ initialData }: ClientQuizAppProps) {
  // データベース管理画面を表示すべきか
  const [showEditTableDisplay, setShowEditTableDisplay] =
    useState<boolean>(false);
  // クイズ後スコア画面を表示すべきか
  const [showScore, setShowScore] = useState<boolean>(false);
  // 解答の状態
  const [answerStatus, setAnswerStatus] = useState<AnswerStatusType>('editing');
  // データベースと同期している全クイズをブラウザ上で管理
  const [allQuizList, setAllQuizList] = useState<QuizSupabase[]>(initialData);
  // 未正解クイズをカテゴリ分けしてブラウザ上で管理
  const [categoryGroup, setCategoryGroup] = useState<CategorizeGroupType>(
    categorizeGroupe(allQuizList),
  );
  // ユーザーが選択したカテゴリ
  const [selectedCategory, setSelectedCategory] = useState<
    QuizCategory | 'all' | null
  >(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const answerInputRef = useRef<HTMLInputElement | null>(null);
  const shouldScroll = useRef<boolean>(false);

  // データベース管理画面用のクイズ一覧データ
  const editTableData = useMemo(
    () => editSupabaseData(allQuizList),
    [allQuizList],
  );

  useEffect(() => {
    if (!shouldScroll.current) return;
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: showEditTableDisplay ? 'start' : 'center',
    });
    shouldScroll.current = false;
  }, [showEditTableDisplay, showScore]);

  /* メニュー画面 */
  const handleCategorySelect = useCallback(
    (category: QuizCategory | 'all') => {
      currentQuizStore = new CurrentQuizStore(
        createQuiz(category, categoryGroup, 10),
      );
      setSelectedCategory(category);
    },
    [categoryGroup],
  );

  /* クイズフォーム画面 */
  const handleInput = useCallback(() => {
    if (answerStatus === 'editing') return;
    setAnswerStatus('editing');
  }, [answerStatus]);

  const handleSubmit = useCallback(
    async (e: FormSubmitEvent) => {
      e.preventDefault();
      const { currentQuiz } = currentQuizStore;
      const isMatchAnswer =
        currentQuiz.correct === answerInputRef.current?.value;
      if (isMatchAnswer) {
        currentQuizStore.pushToScore(true);
        setCategoryGroup({
          ...categoryGroup,
          [currentQuiz.category]: categoryGroup[currentQuiz.category].filter(
            (quiz) => quiz.id !== currentQuiz.id,
          ),
        });
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
        setAnswerStatus('correct');
      } else {
        setAnswerStatus('incorrect');
      }
    },
    [categoryGroup],
  );

  const handleTimeUp = useCallback(() => {
    const { currentQuiz } = currentQuizStore;
    const isMatchAnswer = currentQuiz.correct === answerInputRef.current?.value;
    currentQuizStore.pushToScore(isMatchAnswer);
    if (isMatchAnswer) {
      setCategoryGroup({
        ...categoryGroup,
        [currentQuiz.category]: categoryGroup[currentQuiz.category].filter(
          (quiz) => quiz.id !== currentQuiz.id,
        ),
      });
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('timeup');
    }
  }, [categoryGroup]);

  const handleNextQuiz = useCallback(() => {
    if (!answerInputRef.current) return;
    currentQuizStore.incrementCurrent();
    answerInputRef.current.value = '';
    setAnswerStatus('editing');
  }, []);

  const handleExitQuiz = useCallback(() => {
    const { hasScore } = currentQuizStore;
    if (hasScore) {
      setShowScore(true);
      shouldScroll.current = true;
    }
    setSelectedCategory(null);
    setAnswerStatus('editing');
  }, []);

  /* スコア画面 → menu画面 切り替え */
  const handleReturnMenu = useCallback(() => {
    setShowScore(false);
    shouldScroll.current = true;
  }, []);

  /* データベース管理画面 切り替え */
  const handleEditTableDisplay = useCallback(() => {
    setShowEditTableDisplay((prevShould) => !prevShould);
    shouldScroll.current = true;
  }, []);

  const addQuiz = useCallback(
    (newQuiz: QuizSupabase) => {
      setAllQuizList((preQuizList) => [...preQuizList, newQuiz]);
      setCategoryGroup({
        ...categoryGroup,
        [newQuiz.category]: [...categoryGroup[newQuiz.category], newQuiz],
      });
    },
    [categoryGroup],
  );

  const updateQuiz = useCallback(
    (updateQuiz: QuizSupabase) => {
      setAllQuizList((preQuizList) =>
        preQuizList.map((preQuiz) =>
          preQuiz.id === updateQuiz.id ? updateQuiz : preQuiz,
        ),
      );
      setCategoryGroup({
        ...categoryGroup,
        [updateQuiz.category]: categoryGroup[updateQuiz.category].map((quiz) =>
          quiz.id === updateQuiz.id ? updateQuiz : quiz,
        ),
      });
    },
    [categoryGroup],
  );

  const deleteQuiz = useCallback(
    (deleteQuiz: QuizSupabase) => {
      setAllQuizList((preQuizList) =>
        preQuizList.filter((preQuiz) => preQuiz.id !== deleteQuiz.id),
      );
      setCategoryGroup({
        ...categoryGroup,
        [deleteQuiz.category]: categoryGroup[deleteQuiz.category].filter(
          (quiz) => quiz.id !== deleteQuiz.id,
        ),
      });
    },
    [categoryGroup],
  );

  return (
    <div className="mt-1 font-mono" ref={containerRef}>
      {showEditTableDisplay ? (
        <EditTableList
          editTableData={editTableData}
          onAddQuiz={addQuiz}
          onUpdateQuiz={updateQuiz}
          onDeleteQuiz={deleteQuiz}
          handleEditTableDisplay={handleEditTableDisplay}
        />
      ) : selectedCategory ? (
        <AnswerForm
          answerStatus={answerStatus}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          handleTimeUp={handleTimeUp}
          handleNextQuiz={handleNextQuiz}
          handleExitQuiz={handleExitQuiz}
          currentQuizStore={currentQuizStore}
          answerInputRef={answerInputRef}
        />
      ) : showScore ? (
        <Score
          currentQuizStore={currentQuizStore}
          handleReturnMenu={handleReturnMenu}
        />
      ) : (
        <SelectCategory
          handleCategorySelect={handleCategorySelect}
          handleEditTableDisplay={handleEditTableDisplay}
          categoryGroup={categoryGroup}
        />
      )}
    </div>
  );
}
