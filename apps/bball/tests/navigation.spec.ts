import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("home page", async ({ page }) => {
		await expect(page).toHaveURL("/");
	});

	test("/standings page", async ({ page }) => {
		await page.goto("/standings");
		await expect(page).toHaveURL("/standings");
	});

	test("/teams page", async ({ page }) => {
		await page.goto("/teams");
		await expect(page).toHaveURL("/teams");
	});

	test("/players page", async ({ page }) => {
		await page.goto("/players");
		await expect(page).toHaveURL("/players");
	});
});
