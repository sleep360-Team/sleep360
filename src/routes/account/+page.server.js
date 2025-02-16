import { fail, redirect } from '@sveltejs/kit';
import { createAccount, updateAccount, deleteAccount, getUserID } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
	const id = cookies.get("session_id");
	if(id == '') {
		throw redirect(303, "/");
	};
}

export const actions = {

	update: async ({ request, cookies}) => {
		const userid = cookies.get("session_id");
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email');
		const name = formData.get('name');
		const major = formData.get('major');
		
  
	  if (!email || !name || !major || !userid) {
		return fail(400, { error: 'All fields are required.' });
	  }
  
	  try {
		console.log(email, name, major);
		await updateAccount(email, name, major, userid);
		return { success: true };
	  } catch (error) {
		console.error('Database error:', error);
		return fail(500, { error: 'Failed to create account.' });
	  }
	},
	delete: async ({ request, cookies }) => {
		const userid = cookies.get("session_id");
  
	  try {
		await deleteAccount(userid);
		return { success: true };
	  } catch (error) {
		console.error('Database error:', error);
		return fail(500, { error: 'Failed to create account.' });
	  }
	}
	

  };
