import { redirect } from '@sveltejs/kit';
import {checkAccountReports} from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const id = cookies.get('session_id');
	if (id == '') {
		throw redirect(303, '/');
	}
	const result = await checkAccountReports(id);
	if (result == 0) {
		redirect(303, '/noRecommendations')
	}
}
