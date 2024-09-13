// 環境変数の型を定義
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME: 'todo Table';
      NEXT_PUBLIC_SUPABASE_JS_QUIZ_TABLE_NAME: 'js_quiz_table';
    }
  }
}

export {};
