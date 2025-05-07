import { test, expect } from '@playwright/test';

test('report named properly', async ({ page }) => {
	await page.goto('/report');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Report/);
});
