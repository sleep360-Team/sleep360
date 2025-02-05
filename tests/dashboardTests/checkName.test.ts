import { test, expect } from '@playwright/test';

test('dashboard named properly', async ({ page }) => {
  await page.goto('/dashboard');

  // Expect the page to be titled Dashboard
  await expect(page).toHaveTitle(/Dashboard/);
});