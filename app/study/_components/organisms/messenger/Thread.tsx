import { useEffect, useRef } from 'react';
import { ThreadProps } from './type/type';

const demonstrationThread = (
  <>
    <div className="flex gap-3 text-sm text-gray-600">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-gray-100">
        <svg
          stroke="none"
          fill="black"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          ></path>
        </svg>
      </div>
      <p className="leading-relaxed">
        <span className="block font-bold text-gray-700">AI</span>Hi, how can I
        help you today?
      </p>
    </div>

    <div className="flex gap-3 text-sm text-gray-600">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-gray-100">
        <svg
          stroke="none"
          fill="black"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
        </svg>
      </div>
      <p className="leading-relaxed">
        <span className="block font-bold text-gray-700">You</span>fewafef
      </p>
    </div>

    <div className="flex gap-3 text-sm text-gray-600">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-gray-100">
        <svg
          stroke="none"
          fill="black"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          ></path>
        </svg>
      </div>
      <p className="leading-relaxed">
        <span className="block font-bold text-gray-700">AI</span>Sorry, I
        couldn&apos;t find any information in the documentation about that.
        Expect answer to be less accurateI could not find the answer to this in
        the verified sources.
      </p>
    </div>
  </>
);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export default function Thread({ posts, userId = null, profiles = null }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (
      containerRef.current?.lastChild &&
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    ) {
      const elm = containerRef.current.lastChild as HTMLDivElement;
      elm.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [posts]);

  const insertThread = profiles ? null : demonstrationThread;

  return (
    <>
      <h3 className="border-b pb-4 text-lg font-semibold tracking-tight">
        Thread
      </h3>
      <div
        className="flex max-h-[500px] min-h-[300px] flex-col gap-4 overflow-y-auto py-4"
        ref={containerRef}
      >
        {insertThread}
        {posts.map((post: any) => (
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
                    profiles ? profiles.find((profile: any) => profile.id === post.user_id).nickname : post.slug
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
