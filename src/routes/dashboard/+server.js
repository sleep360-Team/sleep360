import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getCurrentRec } from '$lib/server/database'; 

/** @type {import('./$types').PageServerLoad} */
export async function GET({ cookies }) {
    try {
        const id = cookies.get("session_id");
            if(id == '') {
                throw redirect(303, "/");
            } else {
                const result = await getCurrentRec(id);
              
            return json({  result});
            };
        } catch (error) {
      console.error('Error fetching recommendations:', error);
      return json({ error: 'Failed to fetch recommendations' }, { status: 500 });
    }
  }
  