import { fail } from '@sveltejs/kit';
import { createReport } from '$lib/server/database.js';

function getESTTime() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const timeReportedEST = formatter.format(now).replace(',', ''); 
  return timeReportedEST;
}

export const actions = {
  create: async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
		const numHours = formData.get('numHours');
		const numInterrupts = formData.get('numInterrupts');
		const qualitySleep = formData.get('qualitySleep');

    const timeReported = getESTTime();

    if (!timeReported || !numHours || !numInterrupts || !qualitySleep) {
      return fail(400, { error: 'All fields are required and valid.' });
    }

    try {
      await createReport(timeReported, +numHours, +numInterrupts, qualitySleep);
      return { success: true, message: 'Report created successfully' };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, { error: 'Failed to create report.' });
    }
  }
};
