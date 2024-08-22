import { createClient } from '@supabase/supabase-js';
import { Database } from './schema.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;

// export default async function TodoList() {
// 	const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
// 	const result = await supabase.from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME!).select();
// 	return <pre>{JSON.stringify(result, null, 2)}</pre>
// }
