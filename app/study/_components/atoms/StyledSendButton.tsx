import React, { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default forwardRef<HTMLButtonElement, ButtonProps>(
  function StyledSendButton(props, ref) {
    return (
      <button
        ref={ref}
        className="rounded-full p-2 text-blue-600 hover:bg-blue-100 disabled:pointer-events-none disabled:opacity-50"
        {...props}
      >
        <svg
          className="size-6 rotate-90"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    );
  },
);
