import { test, expect } from '@playwright/test';

test('redirect after sign in', async ({ page }) => {
	await page.goto('/');

	// Ensure redirect on sign in

	await page.getByLabel('Username:').fill('dummy');

	await page.getByLabel('Password:').fill('password');

	await page.getByRole('button', { name: 'Log In' }).click();

	await expect(page).toHaveTitle(/Dashboard/);
});
