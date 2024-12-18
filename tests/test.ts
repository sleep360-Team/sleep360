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
		await expect(page).toHaveTitle('Homepage Title'); // Replace with actual title
		await expect(page.locator('h1')).toContainText('Welcome to the Homepage'); // Example heading
	});
});

// Test for the /report route
test.describe('Report page tests', () => {
	test('should load the report page successfully', async ({ page }) => {
		await page.goto('/report');
		await expect(page).toHaveTitle('Report Page Title'); // Replace with actual title
		await expect(page.locator('h1')).toContainText('Create a New Report'); // Example heading
	});

	test('should display report creation form', async ({ page }) => {
		await page.goto('/report');
		const form = page.locator('form');
		await expect(form).toBeVisible();
		await expect(form.locator('input[name="title"]')).toBeVisible();
		await expect(form.locator('textarea[name="description"]')).toBeVisible();
	});
});

// Test for the /reports route
test.describe('Reports listing page tests', () => {
	test('should load the reports page successfully', async ({ page }) => {
		await page.goto('/reports');
		await expect(page).toHaveTitle('Reports List Title'); // Replace with actual title
		await expect(page.locator('h1')).toContainText('All Reports'); // Example heading
	});

	test('should display a list of reports', async ({ page }) => {
		await page.goto('/reports');
		const reportList = page.locator('.report-item'); // Adjust selector based on actual structure
		await expect(reportList).toHaveCountGreaterThan(0); // Should list some reports
	});
});

// Test for the /account route
test.describe('Account page tests', () => {
	test('should load the account page successfully', async ({ page }) => {
		await page.goto('/account');
		await expect(page).toHaveTitle('Account Page Title'); // Replace with actual title
		await expect(page.locator('h1')).toContainText('Account Details'); // Example heading
	});

	test('should show account information', async ({ page }) => {
		await page.goto('/account');
		await expect(page.locator('.account-name')).toBeVisible(); // Adjust selector as needed
		await expect(page.locator('.account-email')).toBeVisible(); // Adjust selector as needed
	});
});

// Test for the /dashboard route
test.describe('Dashboard page tests', () => {
	test('should load the dashboard page successfully', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveTitle('Dashboard Title'); // Replace with actual title
		await expect(page.locator('h1')).toContainText('Dashboard Overview'); // Example heading
	});

	test('should display statistics on the dashboard', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page.locator('.statistics')).toBeVisible(); // Adjust selector based on the actual dashboard structure
	});

	test('should have a sidebar with navigation', async ({ page }) => {
		await page.goto('/dashboard');
		const sidebar = page.locator('.sidebar');
		await expect(sidebar).toBeVisible();
		await expect(sidebar.locator('a[href="/report"]')).toBeVisible();
		await expect(sidebar.locator('a[href="/reports"]')).toBeVisible();
		await expect(sidebar.locator('a[href="/account"]')).toBeVisible();
	});
});
