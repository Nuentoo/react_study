'use client';

import { useState, useEffect, useReducer } from 'react';
import { createClient } from '@/_utils/supabase/auth_chat/client';
import Thread from './Thread';
import Chat from './Chat';
import ContactList from './ContactList';
import messengerReducer from './modules/messengerReducer';
import { addMessage } from './modules/store.ts';
import type { ContactsType, MessengerType, Posts } from './type/type';

// export const contacts = [
//   { id: 0, name: 'gmail', email: 'hoge@gmail.com' },
//   { id: 1, name: 'nijibox', email: 'nijibox@' },
//   { id: 2, name: 'yahoo', email: 'hogehoge@yahoo.co.jp' },
// ] as const;

// const generateObjFromContactsId = (
//   contacts: ContactsType,
// ): MessengerType['message'] => {
//   return Object.fromEntries(
//     contacts.map(({ id }) => [id, '']), // 空の文字列を設定
//   ) as MessengerType['message'];
// };

const generateObjFromContactsId = (contacts: any) => {
  return Object.fromEntries(
    contacts.map(({ id }: any) => [id, '']), // 空の文字列を設定
  );
};

// const initialMessengerState: MessengerType = {
//   selectedId: 0,
//   message: generateObjFromContactsId(contacts),
// };

const initialMessengerState = (channels: any) => {
  return {
    selectedId: channels[0].id,
    message: generateObjFromContactsId(channels),
  };
};

// const initialPosts: [] = [];

export default function ChannelMessanger({ initialData }: any) {
  const {
    userId,
    userNickName,
    profiles: initialProfiles,
    channels,
    messages: initialMessages,
  } = initialData;
  const [profiles, setProfiles] = useState(initialProfiles);
  // const [posts, setPosts] = useState<Posts>(initialPosts);
  const [posts, setPosts] = useState(initialMessages);
  // const [state, dispatch] = useReducer(messengerReducer, initialMessengerState);
  console.log(
    'initialMessengerState(channels)',
    initialMessengerState(channels),
  );
  const [state, dispatch] = useReducer(
    messengerReducer,
    initialMessengerState(channels),
  );
  console.log('state', state.selectedId);
  const contact = channels.find(({ id }: any) => id === state.selectedId);
  // console.log('contact', contact)
  // console.log('posts', posts)
  // const selectedMessage = state.message[state.selectedId];
  const selectedMessage = state.message[state.selectedId];
  const selectedPosts = posts.filter(
    ({ channel_id }: any) => channel_id === state.selectedId,
  );

  useEffect(() => {
    console.log('realtime!!!');
    const supabase = createClient();
    // ensure you have enabled replication on the `posts` table
    // https://app.supabase.com/project/_/database/replication
    const channelProfiles = supabase
      .channel('profiles')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        (payload) => {
          console.log('payload profiles!!', payload);
          setProfiles((prev: any) => [...prev, payload.new]);
        },
      )
      .subscribe();

    const channelChannels = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          console.log('payload messages!!', payload);
          setPosts((prev: any) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelProfiles);
      supabase.removeChannel(channelChannels);
    };
  }, []);

  const addPosts = async (pastPosts: Posts) => {
    await addMessage(selectedMessage, userId, state.selectedId);
  };

  return (
    <div className="flex gap-x-4">
      <ContactList
        contacts={channels}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <div className="w-[768px] rounded-lg border bg-white p-5 shadow-lg">
        <Thread posts={selectedPosts} userId={userId} profiles={profiles} />
        <Chat
          key={contact.id}
          contact={contact}
          selectedMessage={selectedMessage}
          posts={posts}
          addPosts={addPosts}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
