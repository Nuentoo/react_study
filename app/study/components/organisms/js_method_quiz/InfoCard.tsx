import React, { useEffect, useRef } from 'react';
import { TIME_LIMIT } from './modules/constant';
import type { InfoCardProps } from './type/types';

export default function InfoCard({
  isCorrect,
  isTimeUp,
  timeLeft,
  setTimeLeft,
  handleTimeUp,
  currentQuizStore,
  answerInputRef,
  nextButtonRef,
}: InfoCardProps) {
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { current, total, currentScoreRate } = currentQuizStore;

  const cleanUpTimer = () => {
    if (!(intervalIdRef.current && timeoutIdRef.current)) return;
    clearInterval(intervalIdRef.current);
    clearTimeout(timeoutIdRef.current);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    intervalIdRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 2) {
          if (!intervalIdRef.current) return TIME_LIMIT;
          clearInterval(intervalIdRef.current);
          return 1;
        }
        return prev - 1;
      });
    }, 1000);

    timeoutIdRef.current = setTimeout(() => {
      handleTimeUp();
      setTimeLeft(0);
    }, TIME_LIMIT * 1000);

    return () => cleanUpTimer();
  }, [current, handleTimeUp]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isCorrect || isTimeUp) {
      nextButtonRef.current?.focus();
      cleanUpTimer();
    } else {
      answerInputRef.current?.focus();
    }
  }, [isCorrect, isTimeUp, answerInputRef, nextButtonRef]);

  return (
    <div className="flex justify-end">
      <div className="space-y-1">
        <div className="flex items-center">
          <label htmlFor="remaining quiz">Quiz :　</label>
          <p id="remaining quiz">{`${current} / ${total}`}</p>
        </div>
        <div className="flex items-center">
          <label htmlFor="timer">timeLimit :　</label>
          <time id="timer" dateTime="PT10S">
            <span className="font-bold">{timeLeft}</span> seconds
          </time>
        </div>
        <div className="flex items-center">
          <label htmlFor="score rate">Score :　</label>
          <div id="score rate" className="w-56 rounded-full bg-blue-50">
            <div
              className="rounded-full bg-blue-500 py-0.5 text-center text-xs font-medium leading-none text-blue-50"
              style={{
                width: currentScoreRate,
                transition: 'width 2.0s ease',
              }}
            >
              {currentScoreRate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
