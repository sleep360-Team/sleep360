// @ts-nocheck
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
  const parts = timeReportedEST.split(' '); // Split date and time
  const dateParts = parts[0].split('/'); // [MM, DD, YYYY]
  const timeParts = parts[1].split(':'); // [HH, MM, SS]

  const formattedTime = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]} ${timeParts.join(':')}`;
  return formattedTime;
}
const getSleepQualityString = (/** @type {number} */ value) => {
  switch (value) {
      case 1: return 'Worst';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Best';
  }
};
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
		const numHours = data.get('numberHours');
		const numInterrupts = data.get('numberInterrupts');
		const qualitySleep = data.get('qualitySleep');

    const timeReported = getESTTime();
    console.log("timeReported", timeReported);
    const qualitySleepString = getSleepQualityString(+qualitySleep);

    if (!timeReported || !numHours || !numInterrupts || !qualitySleep) {
      return fail(400, { error: 'All fields are required and valid.' });
    }

    try {
      await createReport(timeReported, +numHours, +numInterrupts, qualitySleepString);
      return { success: true, message: 'Report created successfully' };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, { error: 'Failed to create report.' });
    }
  }
};
