import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import type { ScoreProps } from './type/types';

export default function Score({
  currentQuizStore,
  handleReturnMenu,
}: ScoreProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  const { selectedQuizzes, score, correctAnswerFraction } = currentQuizStore;

  return (
    <div className="w-[600px] text-gray-800">
      <p className="text-center text-lg">正解率は {correctAnswerFraction}</p>
      <ul className="mt-8 space-y-6">
        {score.map((bool, index) => {
          const { id, category, question, correct } = selectedQuizzes[index];
          return (
            <li
              key={id}
              className="grid grid-cols-[minmax(60px,auto)_minmax(20rem,1fr)_auto_auto] items-center gap-x-5"
            >
              <p className="text-gray-700">{category}</p>
              <p>{question}</p>
              <strong>{correct}</strong>
              {bool ? (
                <Image
                  src={`/js_method_quiz/check-mark.png`}
                  alt="correct"
                  width="30"
                  height="30"
                  className="self-center"
                />
              ) : (
                <Image
                  src={`/js_method_quiz/cross.png`}
                  alt="incorrect"
                  width="30"
                  height="30"
                  className="self-center"
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-10 text-center">
        <VariantsButton
          type="button"
          className={buttonStyles({ color: 'green' })}
          onClick={handleReturnMenu}
          ref={buttonRef}
        >
          Back to Menu
        </VariantsButton>
      </div>
    </div>
  );
}
