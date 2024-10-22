import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/_utils/supabase/auth_chat/schema.types';

const supabaseChatUrl = process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL;
const supabaseChatAnonKey = process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY;

export function createClient() {
	const cookieStore = cookies();

	return createServerClient<Database, CookieOptions>(
		supabaseChatUrl,
		supabaseChatAnonKey,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll(); // {name: id名, value: jwt}[]
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}
