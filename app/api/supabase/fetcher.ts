import type { Tables, TablesInsert, TablesUpdate } from '@/app/api/supabase/schema.types';

type methodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const fetcherTodoTable = async (method: methodType, body?: TablesInsert<'todo Table'> | TablesUpdate<'todo Table'> | Tables<'todo Table'>['created_at']): Promise<Promise<Tables<'todo Table'>[]>> | never => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/supabase`, {
        method: method,
        headers: { 'Content-Type': 'application/json'},
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        throw new Error(`【status ${res.status}】Failed to ${method} by ${'@/app/api/route'}, ${await res.text()}`);
    }
    return res.json();
};

export default fetcherTodoTable;
