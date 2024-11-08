import { fail, redirect } from '@sveltejs/kit';
import { createAccount } from '$lib/server/database.js';

export const actions = {
	create: async ({ request }) => {
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email');
		const name = formData.get('name');
		const major = formData.get('major');
  
	  if (!email || !name || !major) {
		return fail(400, { error: 'All fields are required.' });
	  }
  
	  try {
		console.log(email, name, major);
		await createAccount(email, name, major);
		return { success: true, message: 'Account created successfully' };
	  } catch (error) {
		console.error('Database error:', error);
		return fail(500, { error: 'Failed to create account.' });
	  }
	}
  };
