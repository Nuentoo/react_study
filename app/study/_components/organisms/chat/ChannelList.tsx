import type { ChannelListProps } from './type/type';

export default function ChannelList({
  channels,
  currentChannel,
  chatDispatch,
}: ChannelListProps): React.ReactElement {
  return (
    <ul className="h-fit rounded-lg border bg-gray-100 shadow-lg">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="min-w-[120px] items-center border-b border-gray-200 last-of-type:border-none"
        >
          <button
            className="w-full px-3 py-2"
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
          </button>
        </li>
      ))}
    </ul>
  );
}
