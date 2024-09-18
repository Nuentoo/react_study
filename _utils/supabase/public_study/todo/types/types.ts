import type { Tables } from '@/_utils/supabase/schema.types';

export type methodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type BodyForGet = null;
type BodyForPost = Omit<Tables<'todo Table'>, 'created_at'>;
type BodyForPatch = Tables<'todo Table'>;
type BodyForDelete = Tables<'todo Table'>['created_at'];

export type BodyByMethodType<T extends methodType> = T extends 'GET'
  ? BodyForGet
  : T extends 'POST'
    ? BodyForPost
    : T extends 'PATCH'
      ? BodyForPatch
      : T extends 'DELETE'
        ? BodyForDelete
        : never;

export type fetcherTodoTableReturnType =
  | Promise<Tables<'todo Table'>[]>
  | never;
