import { json } from '@sveltejs/kit';
import { getCurrentRec } from '$lib/server/database'; 

export async function GET({cookies}) {
  try {
    const id = cookies.get("session_id");
    const result = await getCurrentRec(id);
    console.log(result);

    return json(result); // Adjust to match the actual result structure
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return json({ error: 'Failed to fetch recommendation' }, { status: 500 });
  }
}