import React from 'react';
import Image from 'next/image';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import type { QuizSupabase } from '@/_utils/supabase/public_study/quiz/types/types';
import type { SelectCategoryProps } from './type/types';

export default function SelectCategory({
  handleCategorySelect,
  handleEditTableDisplay,
  categoryGroup,
}: SelectCategoryProps) {
  const isAllFinished = Object.values(categoryGroup).flat().length === 0;

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
      <div className="flex gap-x-3">
        <VariantsButton
          className={buttonStyles({ color: 'blue' })}
          onClick={() => handleCategorySelect('all')}
          disabled={isAllFinished}
        >
          All Quiz
        </VariantsButton>
        {isAllFinished && (
          <Image
            src="/js_method_quiz/done.png"
            alt="done"
            width="40"
            height="40"
          />
        )}
      </div>
      {Object.keys(categoryGroup).map((key) => {
        const category = key as QuizSupabase['category'];
        const isFinished = categoryGroup[category].length === 0;

        return (
          <div className="flex gap-x-3" key={category}>
            <VariantsButton
              className={buttonStyles({ color: 'blue' })}
              onClick={() => handleCategorySelect(category)}
              disabled={isFinished}
            >
              {category}
            </VariantsButton>
            {isFinished && (
              <Image
                src="/js_method_quiz/done.png"
                alt="done"
                width="36"
                height="36"
              />
            )}
          </div>
        );
      })}
      <div className="col-span-full mt-5 text-center">
        <VariantsButton
          className={buttonStyles({ color: 'green' })}
          onClick={handleEditTableDisplay}
        >
          Edit Database
        </VariantsButton>
      </div>
    </div>
  );
}
