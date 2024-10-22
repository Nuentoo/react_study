import Link from 'next/link';
import ClientChatApp from './ClientChatApp';
import { getAuthData } from './modules/settion';
import anchorStyles from './styles/anchorStyles';

export default async function SeverChatApp() {
	const data = await getAuthData();

	return data ? (
		<ClientChatApp initialData={data} />
	) : (
		<>
			<div className="space-y-6">
				<strong> Let&apos;s Sign up or Login </strong>
				<Link href="/study/login" className={anchorStyles({ color: 'blue' })}>
					Login Form
				</Link>
			</div>
		</>
	);
}
