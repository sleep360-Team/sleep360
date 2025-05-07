import { fail, redirect } from '@sveltejs/kit';
import { createAccount, updateAccount, deleteAccount, getUserID } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
	const id = cookies.get('session_id');
	if (id == '') {
		throw redirect(303, '/');
	}
}

export const actions = {
	update: async ({ request, cookies }) => {
		console.log(cookies.get('session_id'));
		const username = 'userhere';
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email');
		const name = formData.get('name');
		const major = formData.get('major');

		if (!email || !name || !major) {
			return fail(400, { error: 'All fields are required.' });
		}

		try {
			console.log(email, name, major);
			await updateAccount(email, name, major, username);
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to create account.' });
		}
	},
	delete: async ({ request }) => {
		const username = 'eab';

		try {
			const userid = await getUserID(username);
			await deleteAccount(userid);
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to create account.' });
		}
	}
};
