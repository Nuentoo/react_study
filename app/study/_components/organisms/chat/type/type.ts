import { Tables } from '@/_utils/supabase/auth_chat/schema.types';

export type TableProfile = Tables<'profiles'>;
export type TableChannel = Tables<'channels'>;
export type TableMessage = Tables<'messages'>;

export type messageStoreType = {
  channelId: TableChannel['id'];
  message: { [key in TableChannel['id']]: string };
};

export type messageStoreAction =
  | { type: 'CHANNEL_CHANGE'; contactId: messageStoreType['channelId'] }
  | {
      type: 'INPUT_MESSAGE';
      editMessage: { [key in TableChannel['id']]: string }[TableChannel['id']];
    }
  | { type: 'POST_MESSAGE' };

export type ChannelMessengerProps = {
  initialData: {
    userId: string;
    userNickname: string;
    readonly initialProfiles: TableProfile[];
    readonly initialChannels: TableChannel[];
    readonly initialMessages: TableMessage[];
  };
};

export type ChannelListProps = {
  channels: TableChannel[];
  currentChannel: TableChannel | undefined;
  chatDispatch: React.Dispatch<messageStoreAction>;
};

export type ThreadProps = {
  selectedPosts: TableMessage[];
  userId: string;
  profiles: TableProfile[];
};

export type ChatInputBoxProps = {
  currentChannel: TableChannel | undefined;
  selectedMessage: string;
  addPost: () => Promise<void>;
  chatDispatch: React.Dispatch<messageStoreAction>;
};
