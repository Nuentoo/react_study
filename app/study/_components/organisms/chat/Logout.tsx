'use client';

import { useState } from 'react';
import { logout } from './modules/actions';
import anchorStyles from './styles/anchorStyles';

export default function LogoutButton() {
	const [error, setError] = useState<Error['message'] | null>(null);

	const handleLogout = () => {
		logout().catch((e: Error) => {
			setError(e.message);
		});
	};

	return (
		<>
			<button
				className={anchorStyles({ color: 'orange' })}
				type="button"
				onClick={handleLogout}
			>
				Logout
			</button>
			<strong className="text-red-500">{error}</strong>
		</>
	);
}
