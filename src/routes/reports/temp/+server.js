import {deleteReports } from '$lib/server/database.js';

export async function DELETE({ request }) {
	//const number = Math.floor(Math.random() * 6) + 1;
    const { reportID } = await request.json();
    console.log(reportID)
	await deleteReports(reportID)
}