import { contacts } from '../App';

export type ContactsType = typeof contacts;

export type ContactType = ContactsType[number];

export type MessengerType = {
  selectedId: ContactType['id'];
  message: { [key in ContactType['id']]: string };
};

type Post = {
  id: string;
  name: string;
  message: string;
  create_at: string;
};

export type Posts = Post[];

export type MessengerAction =
  | { type: 'MESSENGER_CHANGE'; contactId: MessengerType['selectedId'] }
  | {
      type: 'MESSAGE_INPUT';
      editMessage: { [key in ContactType['id']]: string }[ContactType['id']];
    }
  | { type: 'MESSAGE_SEND' };

export type ThreadProps = {
  posts: Posts;
};

export type ContactListProps = {
  contacts: ContactsType;
  selectedId: ContactType['id'];
  dispatch: React.Dispatch<MessengerAction>;
};

export type ChatProps = {
  contact: ContactType;
  selectedMessage: MessengerType['message'][ContactType['id']];
  posts: Posts;
  addPosts: (pastPosts: Posts) => void;
  dispatch: React.Dispatch<MessengerAction>;
};
