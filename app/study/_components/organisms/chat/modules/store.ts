'use server';

import { createClient } from '@/_utils/supabase/auth_chat/server';
import type { TableProfile, TableChannel, TableMessage } from '../type/type';

// 全てのprofilesの取得
export const getAllProfiles = async (): Promise<TableProfile[]> => {
	const supabase = createClient();
	const { data, error } = await supabase.from('profiles').select('*');
	if (error || !data) {
		return [];
	}
	return data;
};

// 全てのチャンネルの取得
export const getAllChannels = async (): Promise<TableChannel[]> => {
	const supabase = createClient();
	const { data, error } = await supabase.from('channels').select('*');
	if (error || !data) {
		return [];
	}
	return data;
};

// 全てのメッセージの取得
export const getAllMessages = async (): Promise<TableMessage[]> => {
	const supabase = createClient();
	const { data, error } = await supabase.from('messages').select('*');
	if (error || !data) {
		return [];
	}
	return data;
};

// チャンネル追加
export const addChannel = async (slug: string, userId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('channels')
		.insert([{ slug, created_by: userId }])
		.select()
		.single();
	if (error)
		throw new Error(
			`addChannel ：error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
		);
	return data;
};

// チャンネル名の変更
export const renameChannel = async (slug: string, channelId: number) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('channels')
		.update({ slug })
		.eq('id', channelId)
		.select()
		.single();
	if (error)
		throw new Error(
			`renameChannel ：error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
		);
	return data;
};

// チャンネルの削除
export const deleteChannel = async (channelId: number) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('channels')
		.delete()
		.eq('id', channelId)
		.select()
		.single();
	if (error)
		throw new Error(
			`deleteChannel ：error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
		);
	return data;
};

// メッセージ投稿
export const insertMessage = async (
	message: string,
	user_id: string,
	channel_id: number,
) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('messages')
		.insert([{ message, user_id, channel_id }])
		.select()
		.single();
	if (error)
		throw new Error(
			`insertMessage ：error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
		);
	return data;
};
