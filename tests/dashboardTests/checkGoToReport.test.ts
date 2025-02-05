import { test, expect } from '@playwright/test';

test('report page link link', async ({ page }) => {
    await page.goto('/dashboard');
  
    // Click the report page link.
    await page.getByRole('button', { name: 'Add Report' }).click();
  
    // Expects page to have a heading with the name of Report.
    await expect(page).toHaveTitle(/Report/);
  });