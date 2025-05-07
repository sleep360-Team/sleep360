import { json } from '@sveltejs/kit';
import { getRecommendations, addRecToAcc } from '$lib/server/database'; 

export async function GET() {
  try {
    const result = await getRecommendations();

    return json(result); // Adjust to match the actual result structure
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}

export async function POST({ cookies, request }) {
  try {
    const id = cookies.get("session_id");
    const temp = await request.json();
    const recid = temp['selectedRecommendation']['RecommendationID'];
    console.log(recid);
    if(id == null) {
      process.abort();
    }
    const realid = parseInt(id);
    const result = await addRecToAcc(realid, recid);
    return json(result);
  } catch (error) {
    return json({ error: 'Failed to add recommendation to account' }, { status: 500 });
  }
}