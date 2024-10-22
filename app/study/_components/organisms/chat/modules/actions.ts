'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { createClient } from '@/_utils/supabase/auth_chat/server';

export async function login(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	const nickname = formData.get('nickname');
	const password = formData.get('password');

	if (typeof nickname !== 'string' || typeof password !== 'string') return;

	const email = `${nickname}@hoge.com`; // nicknameだと匿名アカウント扱いで、認証に制約がかけられないので、authの仕様に一旦合わせる
	const authData = { email, password };
	await supabase.auth.signOut();

	const { data, error } = await supabase.auth.signInWithPassword(authData);

	if (error) {
		throw new Error(
			`Login Error【${error.status}】 : ${error.name}：${error.code}`,
		);
	}

	revalidatePath('/study', 'layout');
	redirect('/study', RedirectType.replace);
}

export async function signUp(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs

	const nickname = formData.get('nickname');
	const password = formData.get('password');

	if (typeof nickname !== 'string' || typeof password !== 'string') return;

	const email = `${formData.get('nickname')}@hoge.com`;
	const signupData = {
		email: email,
		password: password,
		options: {
			data: {
				nickname: nickname,
			},
		},
	};

	await supabase.auth.signOut();

	const { data, error } = await supabase.auth.signUp(signupData); // TODO: signUpできなくてもアクセストークンは生成される

	if (error) {
		await supabase.auth.signOut(); // TODO: ここでアクセストークンを空にしてみる
		throw new Error(
			`Sign up Error【${error.status}】 : ${error.name}：${error.code}`,
		);
	}

	revalidatePath('/study', 'layout');
	redirect('/study', RedirectType.replace);
}

// ログアウト
export const logout = async () => {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(
			`Logout Error【${error.status}】 : ${error.name}：${error.code}`,
		);
	}

	revalidatePath('/study', 'layout');
	redirect('/study/logout', RedirectType.replace);
};
