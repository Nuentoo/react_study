'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { login, signUp } from '../_components/organisms/chat/modules/actions';
import anchorStyles from '../_components/organisms/chat/styles/anchorStyles';

export default function Page() {
	const [error, setError] = useState<Error['message'] | null>(null);
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const showModal = () => {
		dialogRef.current?.showModal();
	};

	useEffect(() => {
		showModal();
	}, []);

	const handleLogin = (formData: FormData) => {
		login(formData).catch((e: Error) => {
			setError(e.message);
		});
	};

	const handleSignUp = (formData: FormData) => {
		signUp(formData).catch((e: Error) => {
			setError(e.message);
		});
	};

	return (
		<main style={{ height: '100dvh' }}>
			<dialog
				ref={dialogRef}
				className="w-[300px] rounded-lg bg-gray-700 shadow"
			>
				<fieldset>
					<div className="flex items-center justify-between rounded-t border-b border-gray-600 p-4 md:p-5">
						<legend id="loginForm" className="text-xl font-semibold text-white">
							Sign in to Chat
						</legend>
						<Link
							href="/study"
							className="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-gray-600 hover:text-white"
						>
							<svg
								className="size-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</Link>
					</div>
					<div className="p-4 md:p-5">
						<form className="space-y-4">
							<div>
								<label
									htmlFor="nickname"
									className="mb-2 block text-sm font-medium text-white"
								>
									Nickname
								</label>
								<input
									type="text"
									id="nickname"
									name="nickname"
									required
									autoComplete="nickname"
									className="block w-full rounded-lg border-gray-500 bg-gray-600 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-medium text-white"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									required
									autoComplete="current-password"
									minLength={6}
									className="block w-full rounded-lg border-gray-500 bg-gray-600 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
							<div className="flex justify-between">
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											id="remember"
											type="checkbox"
											value=""
											className="size-4 rounded border-gray-500 bg-gray-600 ring-offset-gray-800 focus:ring-blue-600 focus:ring-offset-gray-800"
										/>
									</div>
									<label
										htmlFor="remember"
										className="ms-2 text-sm font-medium text-gray-300"
									>
										Remember me
									</label>
								</div>
								<a className="text-sm text-blue-500 hover:underline">
									Lost Password?
								</a>
							</div>
							<div className="flex gap-x-4">
								<button
									type="submit"
									formAction={handleLogin}
									className={anchorStyles({ color: 'blue', size: 'full' })}
								>
									Login
								</button>
								<button
									type="submit"
									formAction={handleSignUp}
									className={anchorStyles({ color: 'blue', size: 'full' })}
								>
									Sign up
								</button>
							</div>
							<p>
								<strong className="mt-4 text-red-500">{error}</strong>
							</p>
						</form>
					</div>
				</fieldset>
			</dialog>
		</main>
	);
}
