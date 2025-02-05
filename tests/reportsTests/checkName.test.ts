import { test, expect } from '@playwright/test';

test('reports named properly', async ({ page }) => {
  await page.goto('/reports');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Reports/);
});