import React from "react"

export default function TaskSkelton(): React.ReactNode {
    return (
        <div aria-label="Loading..." role="status" className="animate-pulse">
            <div className="flex gap-x-[10px]">
            <div className="h-9 bg-gray-300 w-[400px] rounded-lg shadow"></div>
                <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
            </div>
            <div className="space-y-[10px] divide-gray-200 rounded">
                <div className="flex items-center pt-4 gap-x-[10px]">
                    <div className="h-5 bg-gray-300 rounded w-5 shadow"></div>
                    <div className="w-[400px]">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5 shadow"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full shadow"></div>
                    </div>
                    <div className="flex gap-x-[10px]">
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                    </div>
                </div>
                <div className="flex items-center pt-4 gap-x-[10px]">
                    <div className="h-5 bg-gray-300 rounded w-5 shadow"></div>
                    <div className="w-[400px]">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5 shadow"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full shadow"></div>
                    </div>
                    <div className="flex gap-x-[10px]">
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                    </div>
                </div>
                <div className="flex items-center pt-4 gap-x-[10px]">
                    <div className="h-5 bg-gray-300 rounded w-5 shadow"></div>
                    <div className="w-[400px]">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5 shadow"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full shadow"></div>
                    </div>
                    <div className="flex gap-x-[10px]">
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                    </div>
                </div>
                <div className="flex items-center pt-4 gap-x-[10px]">
                    <div className="h-5 bg-gray-300 rounded w-5 shadow"></div>
                    <div className="w-[400px]">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5 shadow"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full shadow"></div>
                    </div>
                    <div className="flex gap-x-[10px]">
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                        <div className="h-[36px] bg-gray-300 rounded-lg w-[70px] shadow"></div>
                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}