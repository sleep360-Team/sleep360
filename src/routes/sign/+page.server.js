import { fail, redirect } from '@sveltejs/kit';
import { createAccount, getUserID, getUserHashedPassword, updatePassword } from '$lib/server/database.js'; // Ensure this function exists and works as expected
import bcrypt from 'bcrypt'; // Hashing library

async function hashPassword(password) {
  // Generate the salt
  const salt = await bcrypt.genSalt(10); // 10 is the cost factor
  
  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return { hashedPassword, salt };
}


export const actions = {
  create: async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const password = formData.get('password');

    // Validate required fields
    if (!username || !password) {
      return fail(400, { error: 'Username and password are required.' });
    }

    try {
      // Hash the password
      const { hashedPassword } = await hashPassword(password);

      // Save the username and hashed password to the database
      await createAccount(username, hashedPassword);

      return { success: true, message: 'Account created successfully' };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, { error: 'Failed to create account.' });
    }
  },
  changePassword: async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const currentPassword = formData.get('oldpassword');
    const newPassword = formData.get('newpassword');

    if (!username || !currentPassword || !newPassword) {
      return fail(400, { error: 'Username, current password, and new password are required.' });
    }

    try {
      const userID = await getUserID(username);
      const userHashedPw = await getUserHashedPassword(userID);

      if (!userID || !userHashedPw) {
        return fail(401, { error: 'Invalid user information.' });
      }

      const isPasswordCorrect = await bcrypt.compare(currentPassword, String(userHashedPw));
      if (!isPasswordCorrect) {
        return fail(401, { error: 'Current password is incorrect.' });
      }

      // Hash the new password
      const { hashedPassword } = await hashPassword(newPassword);

      // Update the password in the database
      await updatePassword(userID, hashedPassword);

      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      console.error('Change password error:', error);
      return fail(500, { error: 'Failed to change password.' });
    }
  },
  
  login: async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get('username');
    const password = formData.get('password');
    
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
      throw redirect(303, '/dashboard'); 
    } catch (error) {
      console.error('Login error:', error);
      return fail(500, { error: 'Failed to log in.' });
    }
  }
};
