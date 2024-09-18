import React from 'react';

export default function QuizMenuSkelton(): React.ReactNode {
  return (
    <div aria-label="Loading..." role="status" className="animate-pulse">
      <div className="space-y-[16px] divide-gray-200 rounded">
        <div className="flex w-[288px] gap-x-[100px]">
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
        </div>
        <div className="flex w-[288px] gap-x-[100px]">
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
        </div>
        <div className="flex w-[288px] gap-x-[100px]">
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
        </div>
        <div className="flex w-[288px] gap-x-[100px]">
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
        </div>
        <div className="flex justify-center pt-5">
          <div className="h-[36px] w-[130px] rounded-lg bg-gray-300 shadow"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
