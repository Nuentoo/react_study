import supabase from '@/app/api/supabase/client';
import type {
  TablesInsert,
  TablesUpdate,
} from '@/app/api/supabase/schema.types';

export const GET = async () => {
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: true }); // 取得データを created_at 順にソートする
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};

export const POST = async (req: Request) => {
  const todo: TablesInsert<'todo Table'> = await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME)
    .insert(todo)
    .select();
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};

export const PATCH = async (req: Request) => {
  const todo: Required<TablesUpdate<'todo Table'>> = await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME)
    .update(todo)
    .eq('created_at', todo.created_at)
    .select();
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};

export const DELETE = async (req: Request) => {
  const created_atValue: NonNullable<TablesUpdate<'todo Table'>['created_at']> =
    await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME)
    .delete()
    .eq('created_at', created_atValue)
    .select();
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};
