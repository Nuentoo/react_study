'use client';

import { useState, useRef } from 'react';
import { addChannel } from './modules/store';
import anchorStyles from './styles/anchorStyles';
import type { AddChannelButton } from './type/type';

export default function AddChannelButton({ userId }: AddChannelButton) {
	const [error, setError] = useState<Error['message'] | null>(null);

	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const showModal = () => {
		dialogRef.current?.showModal();
		inputRef.current?.focus();
	};

	const hideModal = () => {
		dialogRef.current?.close();
		if (inputRef.current) inputRef.current.value = '';
		setError(null);
	};

	const handleAddChannel = async (formData: FormData) => {
		const channelName = formData.get('channel-name');
		if (typeof channelName !== 'string') return;
		setError(null);
		try {
			await addChannel(channelName, userId);
			hideModal();
			if (inputRef.current) inputRef.current.value = '';
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	return (
		<>
			<button
				className={anchorStyles({ color: 'blue' })}
				type="button"
				onClick={showModal}
			>
				Add Channel
			</button>
			<dialog
				ref={dialogRef}
				className="w-[300px] rounded-lg bg-gray-700 shadow"
			>
				<div className="">
					<fieldset className="">
						<div className="flex items-center justify-between rounded-t border-b border-gray-600 p-4 md:p-5">
							<legend
								id="Channel Setting"
								className="text-xl font-semibold text-white"
							>
								Channel Setting
							</legend>
							<button
								className="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-gray-600 hover:text-white"
								onClick={hideModal}
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
							</button>
						</div>
						<div className="p-4 md:p-5">
							<form className="space-y-4">
								<div>
									<label
										htmlFor="channel-name"
										className="mb-2 block text-sm font-medium text-white"
									>
										Add Channel Name
									</label>
									<input
										type="text"
										id="channel-name"
										name="channel-name"
										required
										className="block w-full rounded-lg border-gray-500 bg-gray-600 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
										ref={inputRef}
									/>
								</div>
								<div className="grid gap-y-4">
									<button
										type="submit"
										formAction={handleAddChannel}
										className={anchorStyles({ color: 'blue', size: 'full' })}
									>
										Add Channel
									</button>
								</div>
								<p>
									<strong className="mt-4 text-red-500">{error}</strong>
								</p>
							</form>
						</div>
					</fieldset>
				</div>
			</dialog>
		</>
	);
}
