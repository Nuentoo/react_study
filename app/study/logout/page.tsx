import Link from 'next/link';
import anchorStyles from '../_components/organisms/chat/styles/anchorStyles';

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-y-5">
			<p>Logout !</p>
			<Link className={anchorStyles({ color: 'blue' })} href="/study">
				Back To Home
			</Link>
		</div>
	);
}
