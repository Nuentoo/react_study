import supabase from '@/app/api/supabase/client';
import type {
  TablesInsert,
  TablesUpdate,
} from '@/app/api/supabase/schema.types';

export const GET = async () => {
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_JS_QUIZ_TABLE_NAME)
    .select('*')
    .order('id', { ascending: true }); // 取得データを id 順にソートする
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};

export const POST = async (req: Request) => {
  const quiz: TablesInsert<'js_quiz_table'> = await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_JS_QUIZ_TABLE_NAME)
    .insert(quiz)
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
  const quiz: Required<TablesUpdate<'js_quiz_table'>> = await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_JS_QUIZ_TABLE_NAME)
    .update(quiz)
    .eq('id', quiz.id)
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
  const quizId: NonNullable<TablesUpdate<'js_quiz_table'>['id']> =
    await req.json();
  const { data, error, status } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_JS_QUIZ_TABLE_NAME)
    .delete()
    .eq('id', quizId)
    .select();
  if (error) {
    return new Response(
      `error_code: ${error.code} , details: ${error.details} , massage: ${error.message}`,
      { status: status },
    );
  }
  return new Response(JSON.stringify(data), { status: status });
};
