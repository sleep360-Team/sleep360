import { json } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { getCurrentRec } from '$lib/server/database'; 
import { dev } from '$app/environment';

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
  export const actions = {
    logout: async ({ cookies }) => {
      try {
        cookies.set('session_id', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: !dev,
        
        });
      } catch (error) {
        console.error('Login error:', error);
        return fail(500, { error: 'Failed to log in.' });
      }
        throw redirect(303, '/'); 
    }
  };