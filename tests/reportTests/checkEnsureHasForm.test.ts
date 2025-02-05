import { test, expect } from '@playwright/test';

test('report has form boxes', async ({ page }) => {
    await page.goto('/report');
  
    // Expects forms to be visible
    await expect(page.getByText('Report Information')).toBeVisible();

    await expect(page.getByLabel('Number of Hours Slept:')).toBeVisible();

    await expect(page.getByLabel('Number of Interruptions:')).toBeVisible();

    await expect(page.getByLabel('Quality of Sleep (1-5):')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Submit Report'})).toBeVisible();
  });