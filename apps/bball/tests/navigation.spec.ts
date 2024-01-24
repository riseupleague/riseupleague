import { test, expect } from "@playwright/test";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

test.describe("navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(baseUrl);
	});

	test("home page", async ({ page }) => {
		await expect(page).toHaveURL(baseUrl);
	});

	test("/standings page", async ({ page }) => {
		await page.goto(`${baseUrl}/standings`);
		await expect(page).toHaveURL(`${baseUrl}/standings`);
	});

	test("/teams page", async ({ page }) => {
		await page.goto(`${baseUrl}/teams`);
		await expect(page).toHaveURL(`${baseUrl}/teams`);
	});

	test("/players page", async ({ page }) => {
		await page.goto(`${baseUrl}/players`);
		await expect(page).toHaveURL(`${baseUrl}/players`);
	});
});
