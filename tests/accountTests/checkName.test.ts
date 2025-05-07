import { test, expect } from '@playwright/test';

test('account named properly', async ({ page }) => {
	await page.goto('/account');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Account/);
});
