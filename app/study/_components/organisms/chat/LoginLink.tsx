import Link from 'next/link';
import anchorStyles from './styles/anchorStyles';

export default function LoginLink() {
	return (
		<Link href="/study/login" className={anchorStyles({ color: 'blue' })}>
			Login Form
		</Link>
	);
}
