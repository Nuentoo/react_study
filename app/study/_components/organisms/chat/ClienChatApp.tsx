'use client';

import { useState, useEffect, useReducer, useMemo } from 'react';
import { createClient } from '@/_utils/supabase/auth_chat/client';
import Thread from './Thread';
import ChatInputBox from './ChatInputBox';
import ChannelList from './ChannelList';
import chatReducer from './modules/chatReducer';
import { insertMessage } from './modules/store';
import type {
  TableProfile,
  TableChannel,
  TableMessage,
  messageStoreType,
  ChannelMessengerProps,
} from './type/type';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

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

export default function ClienChatApp({ initialData }: ChannelMessengerProps) {
  const {
    userId,
    userNickname,
    initialProfiles,
    initialChannels: channels,
    initialMessages,
  } = initialData;
  const [profiles, setProfiles] = useState(initialProfiles);
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

    const channelProfiles = supabase
      .channel('profiles')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        (payload: RealtimePostgresInsertPayload<TableProfile>) => {
          console.log('payload profiles!!', payload);
          setProfiles((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    const channelChannels = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: RealtimePostgresInsertPayload<TableMessage>) => {
          console.log('payload messages!!', payload);
          setPosts((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelProfiles);
      supabase.removeChannel(channelChannels);
    };
  }, []);

  const addPost = async () => {
    await insertMessage(currentMessage, userId, messageStore.channelId);
  };

  return (
    <div className="flex gap-x-4">
      <ChannelList
        channels={channels}
        currentChannel={currentChannel}
        chatDispatch={chatDispatch}
      />
      <div className="w-[768px] rounded-lg border bg-white p-5 shadow-lg">
        <Thread
          selectedPosts={selectedPosts}
          userId={userId}
          profiles={profiles}
        />
        <ChatInputBox
          currentChannel={currentChannel}
          selectedMessage={currentMessage}
          addPost={addPost}
          chatDispatch={chatDispatch}
        />
      </div>
    </div>
  );
}
