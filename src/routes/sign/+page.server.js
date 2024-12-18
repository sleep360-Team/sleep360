import { fail } from '@sveltejs/kit';
import { createAccount } from '$lib/server/database.js'; // Ensure this function exists and works as expected
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
  }
};
