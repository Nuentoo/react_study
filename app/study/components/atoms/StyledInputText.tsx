import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const StyledInputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    // console.log('StyledInputText を再レンダリング？？？')
    return (
      <input
        ref={ref}
        type="text"
        className="h-9 min-w-[25rem] rounded-lg border-emerald-500 indent-4 shadow-md focus:outline-none focus:ring focus:ring-emerald-600"
        {...props}
      />
    );
  },
);

StyledInputText.displayName = 'StyledInputText';

export default StyledInputText;
