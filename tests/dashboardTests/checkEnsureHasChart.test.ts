import { test, expect } from '@playwright/test';

test('dashboard has chart', async ({ page }) => {
    await page.goto('/dashboard');
  
    // Expects chart itself to be visible
    await expect(page.getByTitle('chart-container')).toBeVisible();
  });