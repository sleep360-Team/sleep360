
import { fail } from '@sveltejs/kit';
import { checkIfReportExistsToday, readReportsDashboard } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    const id = cookies.get("session_id");
    const recordSet = readReportsDashboard(id);
	return {
        recordSet
	};
}