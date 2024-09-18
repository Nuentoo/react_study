'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/_utils/supabase/auth_chat/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = `${formData.get('nickname')}@hoge.com`; // nicknameだと匿名アカウント扱いで、認証に制約がかけられないので、authの仕様に一旦合わせる
  const data = {
    email: email as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // redirect('/error')
    console.log('サインインエラー', error);
  }

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

  const { data, error } = await supabase.auth.signUp(signupData);

  if (error) {
    // redirect('/error')
    console.log('サインアップエラー', error);
  }
  console.log('data', data);

  revalidatePath('/study', 'layout');
  redirect('/study');
}

export async function loginCheck() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    // redirect('/login')
    return false;
  }
  return true;
}
