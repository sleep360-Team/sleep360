import { test, expect } from '@playwright/test';

test('check for a specific report existing', async ({ page }) => {
    await page.goto('/');
  
    // Ensure redirect on sign in

    await page.getByLabel('Username:').fill('dummy');

    await page.getByLabel('Password:').fill('password');

    await page.getByRole('button', {name: 'Log In'}).click();

    await expect(page).toHaveTitle(/Dashboard/);

    await page.getByRole('link', {name: 'Reports'}).click();

    //await page.goto('/reports');

    await expect(page).toHaveTitle(/Reports/);
    
    await expect(page.getByText('Josh. Where are the reports?')).toBeVisible();
  });