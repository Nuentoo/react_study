'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { createClient } from '@/_utils/supabase/auth_chat/server';
import {
  getUser,
  getAllProfiles,
  getAllChannels,
  getAuthChannels,
  getAllMessages,
  getAuthMessages,
} from './store.ts';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = `${formData.get('nickname')}@hoge.com`; // nicknameだと匿名アカウント扱いで、認証に制約がかけられないので、authの仕様に一旦合わせる
  const authData = {
    email: email as string,
    password: formData.get('password') as string,
  };
  await supabase.auth.signOut();

  const { data, error } = await supabase.auth.signInWithPassword(authData);

  if (error) {
    // redirect('/error')
    console.log('サインインエラー', error);
  }
  // console.log('data', data);

  revalidatePath('/study', 'layout');
  redirect('/study');
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const nickname = formData.get('nickname');
  const email = `${formData.get('nickname')}@hoge.com`; // nicknameだと匿名アカウント扱いで、認証に制約がかけられないので、authの仕様に一旦合わせる
  const signupData = {
    email: email as string,
    password: formData.get('password') as string,
    options: {
      data: {
        nickname: nickname,
      },
    },
  };
  console.log('signupData', signupData);

  await supabase.auth.signOut();

  const { data, error } = await supabase.auth.signUp(signupData);

  if (error) {
    // redirect('/error')
    console.log('サインアップエラー', error);
  }
  // console.log('data', data);

  revalidatePath('/study', 'layout');
  redirect('/study');
}

// ログアウト
export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  redirect('/study', RedirectType.replace);
};

// サーバーサイドレンダリング開始直後 〜 DOM生成前
export async function getAuthData() {
  const { id: userId, nickname: userNickName } = await getUser();
  if (!userId) return null;

  const profiles = await getAllProfiles();

  // const channels = await getAuthChannels(id);

  const channels = await getAllChannels();

  // const channelIds = channels.map(({ id }) => id);
  // const messages = await getAuthMessages(channelIds);

  const messages = await getAllMessages();

  console.log(userId, userNickName, channels, messages);

  return { userId, userNickName, profiles, channels, messages };
}
