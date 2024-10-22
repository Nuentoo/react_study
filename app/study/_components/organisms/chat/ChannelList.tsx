import type { ChannelListProps } from './type/type';

export default function ChannelList({
	profiles,
	channels,
	currentChannel,
	chatDispatch,
}: ChannelListProps): React.ReactElement {
	return (
		<ul className="rounded-lg border bg-gray-100 shadow-lg">
			{channels.map((channel) => (
				<li
					key={channel.id}
					className="min-w-[120px] border-b border-gray-300 last-of-type:border-none"
				>
					<button
						type="button"
						className="grid w-full justify-items-center gap-y-1 px-3 py-2"
						onClick={() => {
							chatDispatch({
								type: 'CHANNEL_CHANGE',
								contactId: channel.id,
							});
						}}
					>
						{channel.id === currentChannel?.id ? (
							<b>{channel.slug}</b>
						) : (
							channel.slug
						)}
						<small>
							owner :{' '}
							{
								profiles.find((profile) => profile.id === channel.created_by)
									?.nickname
							}
						</small>
					</button>
				</li>
			))}
		</ul>
	);
}
