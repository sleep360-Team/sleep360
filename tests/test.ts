import { expect, test } from '@playwright/test';

// test('home page has expected body', async ({ page }) => {
// 	await page.goto('/');
// 	await expect(page.locator('body')).toBeVisible();
// });

// Test that the testing suite is working
test('true', async () => {
	true;
});

// Test for the homepage
test.describe('Homepage tests', () => {
	test('should load the homepage successfully', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(); // Check if page has a title (title is required but we don't specify the content)
		await expect(page.locator('h1')).toBeVisible(); // Check if there's a visible <h1> element
	});
});

// Test for the /report route
test.describe('Report page tests', () => {
	test('should load the report page successfully', async ({ page }) => {
		await page.goto('/report');
		await expect(page).toHaveTitle(); // Ensure the page has a title
		await expect(page.locator('h1')).toBeVisible(); // Check if the <h1> header is present
	});

	test('should display a form or input fields', async ({ page }) => {
		await page.goto('/report');
		const form = page.locator('form');
		await expect(form).toBeVisible(); // Ensure form is visible
		await expect(form.locator('input')).toBeVisible(); // Ensure there's at least one input field
	});
});

// Test for the /reports route
test.describe('Reports listing page tests', () => {
	test('should load the reports page successfully', async ({ page }) => {
		await page.goto('/reports');
		await expect(page).toHaveTitle(); // Ensure the page has a title
		await expect(page.locator('h1')).toBeVisible(); // Ensure there's a visible header
	});

	test('should display a list of items', async ({ page }) => {
		await page.goto('/reports');
		const items = page.locator('.item'); // Assuming report items are listed as .item
		await expect(items).toHaveCountGreaterThan(0); // Ensure there are items in the list
	});
});

// Test for the /account route
test.describe('Account page tests', () => {
	test('should load the account page successfully', async ({ page }) => {
		await page.goto('/account');
		await expect(page).toHaveTitle(); // Ensure the page has a title
		await expect(page.locator('h1')).toBeVisible(); // Ensure there's a visible header
	});

	test('should display user information', async ({ page }) => {
		await page.goto('/account');
		const info = page.locator('.user-info'); // Assuming user info is displayed in .user-info
		await expect(info).toBeVisible(); // Ensure user info is visible
	});
});

// Test for the /dashboard route
test.describe('Dashboard page tests', () => {
	test('should load the dashboard page successfully', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveTitle(); // Ensure the page has a title
		await expect(page.locator('h1')).toBeVisible(); // Ensure there's a visible header
	});

	test('should display dashboard statistics', async ({ page }) => {
		await page.goto('/dashboard');
		const stats = page.locator('.stats'); // Assuming statistics are contained in a .stats element
		await expect(stats).toBeVisible(); // Ensure the statistics element is visible
	});

	test('should have a sidebar or navigation', async ({ page }) => {
		await page.goto('/dashboard');
		const sidebar = page.locator('.sidebar'); // Assuming there's a sidebar for navigation
		await expect(sidebar).toBeVisible(); // Ensure sidebar is visible
		await expect(sidebar.locator('a')).toHaveCountGreaterThan(0); // Ensure the sidebar contains links
	});
});
