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
	| { type: 'CHANNEL_INSERT'; insertId: TableChannel['id'] }
	| { type: 'CHANNEL_DELETE'; deleteId: TableChannel['id'] }
	| {
			type: 'INPUT_MESSAGE';
			editMessage: { [key in TableChannel['id']]: string }[TableChannel['id']];
	  }
	| { type: 'POST_MESSAGE' };

export type ChannelMessengerProps = {
	initialData: {
		readonly userId: TableProfile['id'];
		readonly userNickname: TableProfile['nickname'];
		readonly initialProfiles: TableProfile[];
		readonly initialChannels: TableChannel[];
		readonly initialMessages: TableMessage[];
	};
};

export type ChannelListProps = {
	readonly profiles: TableProfile[];
	readonly channels: TableChannel[];
	readonly currentChannel: TableChannel | undefined;
	readonly chatDispatch: React.Dispatch<messageStoreAction>;
};

export type ThreadProps = {
	readonly profiles: TableProfile[];
	readonly userId: string;
	readonly selectedPosts: TableMessage[];
};

export type ChatInputBoxProps = {
	readonly currentChannel: TableChannel | undefined;
	readonly currentMessage: string;
	readonly addPost: () => Promise<void>;
	readonly chatDispatch: React.Dispatch<messageStoreAction>;
};

export type ChannelToolProps = {
	readonly userId: TableProfile['id'];
	readonly currentChannel: TableChannel | undefined;
};

export type AddChannelButton = {
	readonly userId: TableProfile['id'];
};
