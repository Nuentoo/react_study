import type {
  methodType,
  BodyByMethodType,
  fetcherQuizTableReturnType,
} from '@/app/api/supabase/quiz/types/types';

export class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

const fetcherQuizTable = async <T extends methodType>(
  method: T,
  body: BodyByMethodType<T>,
): fetcherQuizTableReturnType => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/supabase/quiz`,
    {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-cache',
    },
  );
  if (!res.ok) {
    throw new CustomError(
      `【status ${res.status}】Failed to ${method} by ${res.url}, ${await res.text()}`,
      res.status,
    );
  }
  return res.json();
};

export default fetcherQuizTable;
