import { memo } from 'react';
import EditTableItem from './EditTableItem';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import type { EditTableListProps } from './type/types';

const MemoizedVariantsButton = memo(VariantsButton);
const MemoizedEditTableItem = memo(EditTableItem);

export default function EditTableList({
  editTableData,
  onAddQuiz,
  onUpdateQuiz,
  onDeleteQuiz,
  handleEditTableDisplay,
}: EditTableListProps) {
  return (
    <div className="text-gray-700">
      <ul className="flex flex-col gap-y-2.5">
        {editTableData.map((quiz) => (
          <li key={quiz.id}>
            <MemoizedEditTableItem
              quiz={quiz}
              onAddQuiz={onAddQuiz}
              onUpdateQuiz={onUpdateQuiz}
              onDeleteQuiz={onDeleteQuiz}
            />
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <MemoizedVariantsButton
          className={buttonStyles({ color: 'blue' })}
          onClick={handleEditTableDisplay}
        >
          Finish Edit Database
        </MemoizedVariantsButton>
      </div>
    </div>
  );
}
