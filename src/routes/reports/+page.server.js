import { fail, redirect, request } from '@sveltejs/kit';
import { checkIfReportExistsToday, readReports, deleteReport } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    const id = cookies.get("session_id");
    if(id == '') {
        throw redirect(303, "/");
    } else {
    const recordSet = readReports(id);
	return {
        recordSet
    }
	};
}

export const actions = {
    handleRemoveReport: async ({request}) => {
        console.log(request);
    }
}