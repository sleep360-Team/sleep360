import { fail } from '@sveltejs/kit';
import { checkIfReportExistsToday, readReports } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    const id = cookies.get("session_id");
    const recordSet = readReports(id);
	return {
        recordSet
	};
}