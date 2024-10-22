import { tv } from 'tailwind-variants';

const anchorStyles = tv({
	base: 'block rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-lg focus:outline-none focus:ring-4',
	variants: {
		color: {
			blue: 'bg-blue-600 shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/40 focus:ring-blue-800',
			orange:
				'bg-orange-600 shadow-orange-500/20 hover:bg-orange-700 hover:shadow-orange-500/40 focus:ring-orange-800',
		},
		size: {
			full: 'w-full',
		},
	},
	compoundVariants: [{}],
	defaultVariants: {
		color: 'blue',
	},
});

export default anchorStyles;
