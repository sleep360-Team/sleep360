import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

/**
 * @param {{ cookies: import('@sveltejs/kit').Cookies }} context
 */
export async function load({ cookies }) {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	const todos = await db.getTodos(id);
	return {
		todos
	};
}

/**
 * @type {import('@sveltejs/kit').Actions}
 */
export const actions = {
	
	create: async ({ cookies, request }) => {
		const data = await request.formData();

		try {
			db.createTodo(cookies.get('userid'), data.get('description'));
		} catch (error) {
			// Safe type checking
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
			return fail(422, {
				description: data.get('description'),
				error: errorMessage
			});
		}
	},

	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		try{
			db.deleteTodo(cookies.get('userid'), data.get('id'));
		} catch (error) {
			// Safe type checking
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
			return fail(422, {
				description: data.get('description'),
				error: errorMessage
			});
		}
		
	}
};