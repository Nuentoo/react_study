'use server';

import { createClient } from '@/_utils/supabase/auth_chat/server';
import { getAllProfiles, getAllChannels, getAllMessages } from './store';

type GetUserReturnType = Promise<{
	id: string | null;
	nickname: string | null;
}>;

const getUserData = async (): GetUserReturnType => {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(); // cookieによる認証の返却値

	if (error || !user) {
		return { id: null, nickname: null }; // { user: null }, {AuthSessionMissingError: , __isAuthError: true, status: 400, code: undefined}
	}
	return { id: user.id, nickname: user.user_metadata.nickname };
};

// サーバーサイドレンダリング開始直後 〜 DOM生成前
export async function getAuthData() {
	const { id: userId, nickname: userNickname } = await getUserData();
	if (!(userId && userNickname)) return null;

	const initialProfiles = await getAllProfiles();

	const initialChannels = await getAllChannels();

	const initialMessages = await getAllMessages();

	return {
		userId,
		userNickname,
		initialProfiles,
		initialChannels,
		initialMessages,
	};
}
