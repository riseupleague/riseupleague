import { test, expect } from "@playwright/test";

const baseUrl = "https://staging.riseupleague.com";

test("home page", async ({ page }) => {
	await page.goto(`${baseUrl}`);
	await expect(page).toHaveTitle("Rise Up League | Home");
});

test("/standings page", async ({ page }) => {
	await page.goto(`${baseUrl}/standings`);
	await expect(page).toHaveTitle("Rise Up League | Standings");
});

test("/teams page", async ({ page }) => {
	await page.goto(`${baseUrl}/teams`);
	await expect(page).toHaveTitle("Rise Up League | Teams");
});

test("/players page", async ({ page }) => {
	await page.goto(`${baseUrl}/players`);
	await expect(page).toHaveTitle("Rise Up League | Players");
});

test("/league-rules page", async ({ page }) => {
	await page.goto(`${baseUrl}/league-rules`);
	await expect(page).toHaveTitle("Rise Up League | League Rules");
});

test("/terms-and-conditions page", async ({ page }) => {
	await page.goto(`${baseUrl}/terms-and-conditions`);
	await expect(page).toHaveTitle("Rise Up League | Terms and Conditions");
});

test("/refund-policy page", async ({ page }) => {
	await page.goto(`${baseUrl}/refund-policy`);
	await expect(page).toHaveTitle("Rise Up League | Refund Policy");
});

test("/faq page", async ({ page }) => {
	await page.goto(`${baseUrl}/faq`);
	await expect(page).toHaveTitle("Rise Up League | FAQs");
});
