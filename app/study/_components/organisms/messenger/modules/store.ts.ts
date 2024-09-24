'use server';

import { createClient } from '@/_utils/supabase/auth_chat/server';

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(); // cookieによる認証の返却値
  // console.log(user, error);
  if (error || !user) {
    // redirect('/login')
    return { id: null }; // { user: null }, {AuthSessionMissingError: , __isAuthError: true, status: 400, code: undefined}
  }
  return { id: user.id, nickname: user.user_metadata.nickname };
};

// 全てのprofilesの取得
export const getAllProfiles = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*');
  // console.log('profiles', data, error);
  if (error || !data) {
    return [];
  }
  return data;
};

// 全てのチャンネルの取得
export const getAllChannels = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('channels').select('*');
  // console.log('channels', data, error);
  if (error || !data) {
    return [];
  }
  return data;
};

// created_by = user_id のチャンネルの取得
export const getAuthChannels = async (user_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('created_by', user_id);
  // console.log('channels', data, error);
  if (error || !data) {
    return [];
  }
  return data;
};

// メッセージの取得
export const getAllMessages = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('messages').select('*');
  // console.log('messages', data, error);
  if (error || !data) {
    return [];
  }
  return data;
};

// channel_id = (created_by → id)  のメッセージの取得
export const getAuthMessages = async (channel_id: number[]) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .in('channel_id', channel_id);
  // console.log('messages', data, error);
  if (error || !data) {
    return [];
  }
  return data;
};

// チャンネル追加
export const addChannel = async (slug: string, user_id: string) => {
  const supabase = createClient();
  // console.log('slug, user_id', slug, user_id)
  try {
    const { data, error } = await supabase
      .from('channels')
      .insert([{ slug, created_by: user_id }])
      .select();
    // console.log('data!!', data, 'error', error)
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// メッセージ追加
export const addMessage = async (
  message: string,
  user_id: string,
  channel_id: number,
) => {
  const supabase = createClient();
  const { data: messages, error: errorByMessages } = await supabase
    .from('messages')
    .insert([{ message, user_id, channel_id }])
    .select();
  // console.log('messages', messages, errorByMessages)
};
