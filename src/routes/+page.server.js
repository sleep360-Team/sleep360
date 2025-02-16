import { fail, redirect } from '@sveltejs/kit';
import { createAccount, getUserID, getUserHashedPassword, generateResetToken } from '$lib/server/database.js'; // Ensure this function exists and works as expected
import bcrypt from 'bcrypt'; // Hashing library
import { dev } from '$app/environment';
import { showModal } from './account/store.js'; 
import { sendResetEmail } from '$lib/server/mailer.js';
import crypto from 'crypto';


/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
  const id = cookies.get("session_id");
  if(id == undefined) {
  cookies.set('session_id', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
  
  });
}
}

async function hashPassword(password) {
  // Generate the salt
  const salt = await bcrypt.genSalt(10); // 10 is the cost factor
  
  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return { hashedPassword, salt };
}


export const actions = {
  create: async ({ request, cookies }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const password = formData.get('password');
    const id = 0;

    // Validate required fields
    if (!username || !password) {
      return fail(400, { error: 'Username and password are required.' });
    }

    try {
      // Hash the password
      const { hashedPassword } = await hashPassword(password);

      // Save the username and hashed password to the database
      const userID  = await createAccount(username, hashedPassword, id);
      cookies.set('session_id', userID.toString(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
      
      });
      showModal.set(true);
      return { success: true, message: 'Account created successfully' };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, { error: 'Failed to create account.' });
    }
  },

  login: async ({ request, cookies }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const password = formData.get('password');
    let isTrue = false;
    
    // Validate required fields
    if (!username || !password) {
      return fail(400, { error: 'Username and password are required.' });
    }

    try {
      // Retrieve user data from the database
      const userID = await getUserID(username);
      const userHashedPw = await getUserHashedPassword(userID);
      console.log("account data is ", userID, userHashedPw)
      if (!userID || !userHashedPw) {
        return fail(401, { error: 'Invalid user information.' });
      }
      console.log("user ID is ", userID);
      const isPasswordCorrect = await bcrypt.compare(password, String (userHashedPw));

      if (!isPasswordCorrect) {
        return fail(401, { error: 'Invalid username or password.' });
      } 
      isTrue = true;
      cookies.set('session_id', userID.toString(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
      
      });
    } catch (error) {
      console.error('Login error:', error);
      return fail(500, { error: 'Failed to log in.' });
    }
    if(isTrue){
      throw redirect(303, '/dashboard'); 
    }
  },

  reset: async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const email = formData.get('email');
    if (!username || !email) {
      return fail(400, { error: 'Username and email are required.' });
    }
    const userID = await getUserID(username);
    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    const result = await generateResetToken(hashedToken, userid); //storing in the account asociated 

    const resetLink = `https://yourapp.com/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email
    await sendResetEmail(email, resetLink);
  }
};
