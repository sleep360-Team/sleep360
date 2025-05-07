import { test, expect } from '@playwright/test';

test('account has form boxes', async ({ page }) => {
	await page.goto('/account');

	// Expects forms itself to be visible
	//await expect(page.getByRole('label', {name: 'Email:'})).toBeVisible();
	await expect(page.getByLabel('Email:')).toBeVisible();

	//await expect(page.getByRole('label', {name: 'Name:'})).toBeVisible();
	await expect(page.getByLabel('Name:')).toBeVisible();

	//await expect(page.getByRole('label', {name: 'Major:'})).toBeVisible();
	await expect(page.getByLabel('Major:')).toBeVisible();
});
