import { tv } from 'tailwind-variants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = tv({
  base: 'min-w-[70px] center rounded-lg px-2.5 py-1.5 text-white shadow-md transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50',
  variants: {
    color: {
      blue: 'bg-blue-500 shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40',
      red: 'bg-red-500 shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40',
      green:
        'bg-green-500 shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40',
      orange:
        'bg-orange-500 shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/40',
    },
    size: {},
  },
  compoundVariants: [{}],
  defaultVariants: {
    color: 'blue',
  },
});

function StyledBlueButton({ children, ...props }: ButtonProps) {
  // console.log('StyledBlueButton 再レンダリング？？？');
  return (
    <button
      className={buttonVariants({ color: 'blue' })}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  );
}

function StyledRedButton({ children, ...props }: ButtonProps) {
  // console.log('StyledRedButton 再レンダリング？？？');
  return (
    <button
      className={buttonVariants({ color: 'red' })}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  );
}

function StyledGreenButton({ children, ...props }: ButtonProps) {
  // console.log('StyledGreenButton 再レンダリング？？？')
  return (
    <button
      className={buttonVariants({ color: 'green' })}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  );
}

function StyledOrangeButton({ children, ...props }: ButtonProps) {
  // console.log('StyledOrangeButton 再レンダリング？？？')
  return (
    <button
      className={buttonVariants({ color: 'orange' })}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  );
}

export {
  StyledBlueButton,
  StyledRedButton,
  StyledGreenButton,
  StyledOrangeButton,
};
