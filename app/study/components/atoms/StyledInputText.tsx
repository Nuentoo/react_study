import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(
  function StyledInputText(props, ref) {
    // console.log('StyledInputText を再レンダリング？？？');
    return (
      <input
        ref={ref}
        type="text"
        className="h-9 rounded-lg border-emerald-500 indent-4 shadow-md focus:outline-none focus:ring focus:ring-emerald-600"
        {...props}
      />
    );
  },
);
