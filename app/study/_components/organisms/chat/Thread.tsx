import { useEffect, useRef } from 'react';
import type { ThreadProps } from './type/type';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export default function Thread({
  selectedPosts,
  userId,
  profiles,
}: ThreadProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (
      !(
        containerRef.current?.lastChild &&
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      )
    )
      return;
    const elm = containerRef.current.lastChild as HTMLDivElement;
    const scrollPosition = elm.getBoundingClientRect().bottom;
    containerRef.current.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }, [selectedPosts]);

  return (
    <>
      <h3 className="border-b pb-4 text-lg font-semibold tracking-tight">
        Thread
      </h3>
      <div
        className="flex max-h-[500px] min-h-[300px] flex-col gap-4 overflow-y-auto py-4"
        ref={containerRef}
      >
        {selectedPosts.map((post) => (
          <div key={post.id} className="flex gap-3 text-sm text-gray-600">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-gray-100">
              <svg
                stroke="none"
                fill={userId === post.user_id ? 'red' : 'black'}
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
              </svg>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">
              <span className="block">
                <span className="mr-2 font-bold text-gray-700">
                  {
                    profiles.find((profile) => profile.id === post.user_id)
                      ?.nickname
                  }
                </span>
                <small className="text-gray-400">
                  {formatDate(post.inserted_at)}
                </small>
              </span>
              {post.message}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
