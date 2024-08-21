import supabase from "@/app/api/supabase/client";
import type { TablesInsert, TablesUpdate } from '@/app/api/supabase/schema.types';

export const GET = async () => {
    const { data, error } = await supabase.from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME!).select('*').order('created_at', { ascending: true });
    if (error) {
        return new Response(`error_code: ${error.code} , massage: ${error.message}`, { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export const POST = async (req: Request) => {
    const todo: TablesInsert<'todo Table'> = await req.json();
    const { data, error } = await supabase.from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME!).insert(todo).select();
    if (error) {
        return new Response(`error_code: ${error.code} , massage: ${error.message}`, { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export const PATCH = async (req: Request) => {
    const todo: TablesUpdate<'todo Table'> = await req.json();
    const { data, error } = await supabase.from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME!).update(todo).eq('created_at', todo.created_at!).select();
    if (error) {
        return new Response(`error_code: ${error.code} , massage: ${error.message}`, { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export const DELETE = async (req: Request) => {
    const created_atValue: string = await req.json();
    const { data, error } = await supabase.from(process.env.NEXT_PUBLIC_SUPABASE_TODOS_TABLE_NAME!).delete().eq('created_at', created_atValue).select();
    if (error) {
        return new Response(`error_code: ${error.code} , massage: ${error.message}`, { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}
