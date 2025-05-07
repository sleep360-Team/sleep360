// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { createReport, getUserID, checkAccountReports } from '$lib/server/database.js';
import { showModal } from './store.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const id = cookies.get('session_id');
	if (!id) {
		throw redirect(303, '/');
	}

	const result = await checkAccountReports(id);
	const showExtraLabel = result;
	return { showExtraLabel };
}

const getSleepQualityString = (/** @type {number} */ value) => {
	switch (value) {
		case 1:
			return 'Worst';
		case 2:
			return 'Poor';
		case 3:
			return 'Average';
		case 4:
			return 'Good';
		case 5:
			return 'Best';
	}
};
// Generate a custom report ID (timestamp + random number)
function generateReportId() {
	return `report-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
export const actions = {
	create: async ({ request, cookies }) => {
		const data = await request.formData();
		const numHours = data.get('numberHours');
		const numInterrupts = data.get('numberInterrupts');
		const qualitySleep = data.get('qualitySleep');
		const comments = data.get('comments');
		const id = cookies.get('session_id');
		const timeReported = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
		console.log('timeReported', timeReported);
		console.log('comments', comments);
		const followRec = data.get('extraLabel');
		const qualitySleepString = getSleepQualityString(+qualitySleep);

		if (!timeReported || !numHours || !numInterrupts || !qualitySleep) {
			return fail(400, { error: 'First 3 fields are required.' });
		}

		try {
			await createReport(
				timeReported,
				parseFloat(numHours),
				+numInterrupts,
				qualitySleepString,
				comments,
				followRec,
				id
			);
			showModal.set(true);
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to create report.' });
		}
	}
};
