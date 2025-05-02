import {deleteReports} from '$lib/server/database.js';

export async function DELETE({ request }) {
    const { reportID } = await request.json();
    console.log(reportID)
	return deleteReports(reportID)
}