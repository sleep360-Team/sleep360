import { fail, redirect } from '@sveltejs/kit';
import { readReportsDashboard } from '$lib/server/database.js';
import { dev } from '$app/environment';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
	const id = cookies.get('session_id');
	if (id == '') {
		throw redirect(303, '/');
	} else {
		const recordSet = readReportsDashboard(id);
		return {
			recordSet
		};
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		try {
			cookies.set('session_id', '', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev
			});
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { error: 'Failed to log in.' });
		}
		throw redirect(303, '/');
	}
};
