'use client';

import { useState, useEffect, useReducer, useMemo } from 'react';
import { createClient } from '@/_utils/supabase/auth_chat/client';
import LogoutButton from './Logout';
import ChannelTool from './ChannelTool';
import ChannelList from './ChannelList';
import AddChannelButton from './AddChannel';
import ChatInputBox from './ChatInputBox';
import Thread from './Thread';
import chatReducer from './modules/chatReducer';
import { insertMessage } from './modules/store';
import type {
	TableProfile,
	TableChannel,
	TableMessage,
	messageStoreType,
	ChannelMessengerProps,
} from './type/type';
import type {
	RealtimePostgresChangesPayload,
	RealtimePostgresDeletePayload,
	RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';

const generateObjFromChannelIds = (channels: TableChannel[]) => {
	return Object.fromEntries(
		channels.map(({ id }) => [id, '']), // 全てのチャンネルの入力値を空文字列で設定
	);
};

const initialMessengerState = (channels: TableChannel[]): messageStoreType => {
	return {
		channelId: channels[0].id,
		message: generateObjFromChannelIds(channels),
	};
};

export default function ClientChatApp({ initialData }: ChannelMessengerProps) {
	const {
		userId,
		userNickname,
		initialProfiles,
		initialChannels,
		initialMessages,
	} = initialData;
	const [profiles, setProfiles] = useState(initialProfiles);
	const [channels, setChannels] = useState(initialChannels);
	const [posts, setPosts] = useState(initialMessages);
	const [messageStore, chatDispatch] = useReducer(
		chatReducer,
		initialMessengerState(channels),
	);

	const currentChannel = useMemo(
		() => channels.find(({ id }) => id === messageStore.channelId),
		[channels, messageStore.channelId],
	);
	const currentMessage = useMemo(
		() => messageStore.message[messageStore.channelId],
		[messageStore.message, messageStore.channelId],
	);
	const selectedPosts = useMemo(
		() =>
			posts.filter(({ channel_id }) => channel_id === messageStore.channelId),
		[posts, messageStore.channelId],
	);

	useEffect(() => {
		const supabase = createClient();

		const subscribeProfiles = supabase
			.channel('profiles')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'profiles' },
				(payload: RealtimePostgresInsertPayload<TableProfile>) => {
					// console.log('payload profiles!!', payload);
					setProfiles((prev) => [...prev, payload.new]);
				},
			)
			.subscribe();

		const subscribeChannels = supabase
			.channel('channels')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'channels' },
				(payload: RealtimePostgresChangesPayload<TableChannel>) => {
					switch (payload.eventType) {
						case 'INSERT':
							// console.log('payload add channels!!', payload);
							chatDispatch({
								type: 'CHANNEL_INSERT',
								insertId: payload.new.id,
							});
							setChannels((prev) => [...prev, payload.new]);
							break;
						case 'UPDATE':
							// console.log('payload update channels!!', payload);
							setChannels((prev) => {
								return prev.map((data) => {
									if (data.id === payload.new.id) {
										return payload.new;
									} else {
										return data;
									}
								});
							});
							break;
						case 'DELETE':
							// console.log('payload delete channels!!', payload);
							if (!payload.old.id) return;
							chatDispatch({
								type: 'CHANNEL_DELETE',
								deleteId: payload.old.id,
							});
							setChannels((prev) =>
								prev.filter((data) => data.id !== payload.old.id),
							);
							break;
					}
				},
			)
			.subscribe();

		const subscribeMessages = supabase
			.channel('messages')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'messages' },
				(payload: RealtimePostgresInsertPayload<TableMessage>) => {
					// console.log('payload messages!!', payload);
					setPosts((prev) => [...prev, payload.new]);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscribeProfiles);
			supabase.removeChannel(subscribeChannels);
			supabase.removeChannel(subscribeMessages);
		};
	}, []);

	const addPost = async () => {
		try {
			await insertMessage(currentMessage, userId, messageStore.channelId);
		} catch (e) {
			// do nothing
			// if (e instanceof Error) throw new Error(e.message);
		}
	};

	return (
		<>
			<div className="mb-7 flex gap-x-6">
				<strong>
					Hello 🙌{'　'}
					{userNickname}
				</strong>
				<LogoutButton />
				<div className="ml-auto">
					<ChannelTool userId={userId} currentChannel={currentChannel} />
				</div>
			</div>
			<div className="flex items-start gap-x-4">
				<div className="grid content-between gap-y-10 self-stretch">
					<ChannelList
						profiles={profiles}
						channels={channels}
						currentChannel={currentChannel}
						chatDispatch={chatDispatch}
					/>
					<div>
						<AddChannelButton userId={userId} />
					</div>
				</div>
				<div className="w-[768px] rounded-lg border bg-white p-5 shadow-lg">
					<Thread
						userId={userId}
						profiles={profiles}
						selectedPosts={selectedPosts}
					/>
					<ChatInputBox
						currentChannel={currentChannel}
						currentMessage={currentMessage}
						addPost={addPost}
						chatDispatch={chatDispatch}
					/>
				</div>
			</div>
		</>
	);
}
