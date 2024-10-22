'use client';

import { useState, useRef } from 'react';
import Tooltip from '../../atoms/Tooltip';
import anchorStyles from './styles/anchorStyles';
import { renameChannel, deleteChannel } from './modules/store';
import type { ChannelToolProps } from './type/type';

const ChannelTool: React.FC<ChannelToolProps> = ({
	userId,
	currentChannel,
}) => {
	const [error, setError] = useState<Error['message'] | null>(null);

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const isOwnerChannel = userId === currentChannel?.created_by;

	const showModal = () => {
		dialogRef.current?.showModal();
		inputRef.current?.focus();
	};

	const hideModal = () => {
		dialogRef.current?.close();
	};

	const handleChannelRename = async (formData: FormData) => {
		const channelName = formData.get('channel-name');
		if (typeof channelName !== 'string' || !currentChannel?.id) return;
		try {
			await renameChannel(channelName, currentChannel.id);
			hideModal();
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	const handleChannelDelete = async () => {
		try {
			if (!currentChannel?.id) return;
			await deleteChannel(currentChannel.id);
			hideModal();
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	return (
		isOwnerChannel && (
			<>
				<Tooltip text="Channel Setting">
					<button
						type="button"
						className="rounded p-2 text-gray-900 hover:text-gray-700"
						onClick={showModal}
					>
						<svg
							className="size-7"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</Tooltip>
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
											Rename Channel Name
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
											formAction={handleChannelRename}
											className={anchorStyles({ color: 'blue', size: 'full' })}
										>
											Rename Channel
										</button>
										<button
											type="button"
											onClick={handleChannelDelete}
											className={anchorStyles({
												color: 'orange',
												size: 'full',
											})}
										>
											Delete Channel
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
		)
	);
};

export default ChannelTool;
