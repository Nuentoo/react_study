import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import Image from 'next/image';
import InfoCard from './InfoCard';
import StyledInputText from '../../atoms/StyledInputText';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import { randomSelect } from './modules/utils';
import {
  CORRECT_IMAGES,
  INCORRECT_IMAGES,
  TIME_LIMIT,
} from './modules/constant';
import type { QuizFormProps } from './type/types';

const MemoizedVariantsButton = memo(VariantsButton);
const MemoizedStyledInputText = memo(StyledInputText);

export default function AnswerForm({
  answerStatus,
  handleInput,
  handleSubmit,
  handleTimeUp,
  handleNextQuiz,
  handleExitQuiz,
  currentQuizStore,
  answerInputRef,
}: QuizFormProps) {
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const { current, isLastQuiz, currentQuiz } = currentQuizStore;

  const isCorrect = answerStatus === 'correct';
  const isIncorrect = answerStatus === 'incorrect';
  const isTimeUp = answerStatus === 'timeup';
  const correctImage = useMemo(() => randomSelect(CORRECT_IMAGES), [current]); // eslint-disable-line react-hooks/exhaustive-deps
  const incorrectImage = useMemo(
    () => randomSelect(INCORRECT_IMAGES),
    [current], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <form className="flex w-[600px] flex-col gap-y-3" onSubmit={handleSubmit}>
      <InfoCard
        isCorrect={isCorrect}
        isTimeUp={isTimeUp}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        handleTimeUp={handleTimeUp}
        currentQuizStore={currentQuizStore}
        answerInputRef={answerInputRef}
        nextButtonRef={nextButtonRef}
      />
      <p>{currentQuiz.question}</p>
      <div className="self-center">
        <MemoizedStyledInputText
          defaultValue=""
          placeholder="解答したら Enter！"
          pattern="[a-zA-Z]*"
          required
          ref={answerInputRef}
          onInput={handleInput}
          disabled={isCorrect || isTimeUp}
        />
      </div>
      {isCorrect && (
        <Image
          src={`/js_method_quiz/${correctImage}.png`}
          alt={correctImage}
          width="100"
          height="100"
          className="self-center"
        />
      )}
      {(isIncorrect || isTimeUp) && (
        <Image
          src={`/js_method_quiz/${incorrectImage}.png`}
          alt={incorrectImage}
          width="100"
          height="100"
          className="self-center"
        />
      )}
      <div className="flex justify-center gap-x-2.5">
        {isCorrect || isTimeUp ? (
          isLastQuiz ? (
            <VariantsButton
              type="button"
              className={buttonStyles({ color: 'green' })}
              onClick={handleExitQuiz}
              ref={nextButtonRef}
            >
              END！
            </VariantsButton>
          ) : (
            <VariantsButton
              type="button"
              className={buttonStyles({ color: 'blue' })}
              onClick={() => {
                handleNextQuiz();
                setTimeLeft(TIME_LIMIT);
              }}
              ref={nextButtonRef}
            >
              Next！
            </VariantsButton>
          )
        ) : null}
        {!((isCorrect || isTimeUp) && isLastQuiz) && (
          <MemoizedVariantsButton
            type="button"
            className={buttonStyles({ color: 'orange' })}
            onClick={handleExitQuiz}
          >
            Exit
          </MemoizedVariantsButton>
        )}
      </div>
    </form>
  );
}
