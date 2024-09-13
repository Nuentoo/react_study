'use client';

import { useState, useReducer } from 'react';
import Thread from './Thread';
import Chat from './Chat';
import ContactList from './ContactList';
import messengerReducer from './modules/messengerReducer';
import type { ContactsType, MessengerType, Posts } from './type/type';

export const contacts = [
  { id: 0, name: 'gmail', email: 'hoge@gmail.com' },
  { id: 1, name: 'nijibox', email: 'nijibox@' },
  { id: 2, name: 'yahoo', email: 'hogehoge@yahoo.co.jp' },
] as const;

const generateObjFromContactsId = (
  contacts: ContactsType,
): MessengerType['message'] => {
  return Object.fromEntries(
    contacts.map(({ id }) => [id, '']), // 空の文字列を設定
  ) as MessengerType['message'];
};

const initialMessengerState: MessengerType = {
  selectedId: 0,
  message: generateObjFromContactsId(contacts),
};

const initialPosts: [] = [];

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

export default function Messenger() {
  const [posts, setPosts] = useState<Posts>(initialPosts);
  const [state, dispatch] = useReducer(messengerReducer, initialMessengerState);
  // console.log('state', state);
  const contact = contacts[state.selectedId];
  const selectedMessage = state.message[state.selectedId];

  const addPosts = (pastPosts: Posts) => {
    const nowDate = new Date();
    setPosts([
      ...pastPosts,
      {
        id: nowDate.getTime().toString(),
        name: contact.name,
        message: selectedMessage,
        create_at: formatDate(nowDate),
      },
    ]);
  };

  return (
    <div className="flex gap-x-4">
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <div className="max-w-screen-md rounded-lg border bg-white p-5 shadow-lg">
        <Thread posts={posts} />
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
