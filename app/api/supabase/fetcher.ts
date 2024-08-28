import type {
  methodType,
  BodyByMethodType,
  fetcherTodoTableReturnType,
} from '@/app/api/supabase/types/types';

const fetcherTodoTable = async <T extends methodType>(
  method: T,
  body: BodyByMethodType<T>,
): fetcherTodoTableReturnType => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/supabase`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(
      `【status ${res.status}】Failed to ${method} by ${'@/app/api/route'}, ${await res.text()}`,
    );
  }
  return res.json();
};

export default fetcherTodoTable;
