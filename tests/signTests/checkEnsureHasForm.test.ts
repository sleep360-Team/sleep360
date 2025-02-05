import { test, expect } from '@playwright/test';

test('sign in has form boxes', async ({ page }) => {
    await page.goto('/');
  
    // Expects forms to be visible
    await expect(page.getByText('Welcome')).toBeVisible();

    await expect(page.getByLabel('Username:')).toBeVisible();

    await expect(page.getByLabel('Password:')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Log In'})).toBeVisible();

    await expect(page.getByRole('button', {name: 'Sign Up'})).toBeVisible();
  });