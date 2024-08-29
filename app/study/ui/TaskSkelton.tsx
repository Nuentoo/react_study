import React from 'react';

export default function TaskSkelton(): React.ReactNode {
  return (
    <div aria-label="Loading..." role="status" className="animate-pulse">
      <div className="flex gap-x-[10px]">
        <div className="h-9 w-[400px] rounded-lg bg-gray-300 shadow"></div>
        <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
      </div>
      <div className="space-y-[10px] divide-gray-200 rounded">
        <div className="flex items-center gap-x-[10px] pt-4">
          <div className="size-5 rounded bg-gray-300 shadow"></div>
          <div className="w-[400px]">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 shadow"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 shadow"></div>
          </div>
          <div className="flex gap-x-[10px]">
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          </div>
        </div>
        <div className="flex items-center gap-x-[10px] pt-4">
          <div className="size-5 rounded bg-gray-300 shadow"></div>
          <div className="w-[400px]">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 shadow"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 shadow"></div>
          </div>
          <div className="flex gap-x-[10px]">
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          </div>
        </div>
        <div className="flex items-center gap-x-[10px] pt-4">
          <div className="size-5 rounded bg-gray-300 shadow"></div>
          <div className="w-[400px]">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 shadow"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 shadow"></div>
          </div>
          <div className="flex gap-x-[10px]">
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          </div>
        </div>
        <div className="flex items-center gap-x-[10px] pt-4">
          <div className="size-5 rounded bg-gray-300 shadow"></div>
          <div className="w-[400px]">
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 shadow"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 shadow"></div>
          </div>
          <div className="flex gap-x-[10px]">
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
            <div className="h-[36px] w-[70px] rounded-lg bg-gray-300 shadow"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
