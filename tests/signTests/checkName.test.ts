import { test, expect } from '@playwright/test';

test('sign in named properly', async ({ page }) => {
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Sleep360/);
});
