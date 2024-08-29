import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(
  function StyledCheckbox(props, ref?) {
    // console.log('StyledCheckbox 再レンダリング？？？');
    return (
      <input
        type="checkbox"
        className="size-5 cursor-pointer rounded border-gray-300 shadow-sm ring-blue-500 hover:ring-2 focus:ring-2"
        {...props}
        ref={ref}
      />
    );
  },
);
