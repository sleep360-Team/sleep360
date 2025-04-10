import { json } from '@sveltejs/kit';
import { getRecommendations } from '$lib/server/database'; 

export async function GET() {
  try {
    const result = await getRecommendations();
    return json(result); // Adjust to match the actual result structure
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}