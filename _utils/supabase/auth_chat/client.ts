import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/_utils/supabase/auth_chat/schema.types';

const supabaseChatUrl = process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL;
const supabaseChatAnonKey = process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY;

export function createClient() {
  return createBrowserClient<Database>(supabaseChatUrl, supabaseChatAnonKey);
}
