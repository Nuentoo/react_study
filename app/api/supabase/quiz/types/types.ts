import type { Tables } from '@/app/api/supabase/schema.types';

export type methodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// 以下 schema.d.ts では緩いので、再定義

export type QuizCategory =
  | 'Array'
  | 'String'
  | 'Object'
  | 'Map'
  | 'Date'
  | 'Math'
  | 'URL';

export type QuizSupabase = Omit<Tables<'js_quiz_table'>, 'category'> & {
  category: QuizCategory;
};

type BodyForGet = null;
type BodyForPost = QuizSupabase;
type BodyForPatch = QuizSupabase;
type BodyForDelete = QuizSupabase['id'];

export type BodyByMethodType<T extends methodType> = T extends 'GET'
  ? BodyForGet
  : T extends 'POST'
    ? BodyForPost
    : T extends 'PATCH'
      ? BodyForPatch
      : T extends 'DELETE'
        ? BodyForDelete
        : never;

export type fetcherQuizTableReturnType = Promise<QuizSupabase[]> | never;
