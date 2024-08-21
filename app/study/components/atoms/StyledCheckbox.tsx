import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const StyledCheckbox = forwardRef<HTMLInputElement, InputProps>((props, ref?) => {
  // console.log('StyledCheckbox 再レンダリング？？？')
  return (
    <input
      type="checkbox"
      className="h-5 w-5 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400 cursor-pointer"
      {...props}
      ref={ref}
    />
  );
});

StyledCheckbox.displayName = 'StyledCheckbox'

export default StyledCheckbox;