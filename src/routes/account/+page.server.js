import { fail, redirect } from '@sveltejs/kit';
import { createAccount } from '$lib/server/database.js';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const major = formData.get('major') as string;

		// Validate required fields
		if (!email || !name || !major) {
			return fail(400, { error: 'All fields are required.' });
		}

		try {
			await createAccount(email, name, major);
			return { success: true, message: 'Account created successfully' };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to create account.' });
		}
	}
};
