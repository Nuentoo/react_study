import AddTodo from './AddTodo'
import TaskList from './TaskList';
import { TasksProvider } from './contexts/TasksContext';
import fetcherTodoTable from '@/app/api/supabase/fetcher';
import type { TodoSupabase } from './type/type';

export default async function TaskApp () {
	let todos: TodoSupabase[];
	try {
		todos = await fetcherTodoTable('GET')
	} catch (error) {
		todos = [];
		console.error('Error fetching initial todos:', error); // サーバーサイドでエラー吐き出す
	}
	return (
		<TasksProvider initialTodos={todos}>
			<AddTodo />
			<TaskList/>
		</TasksProvider>
	);
}