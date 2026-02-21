import { test, expect } from '@playwright/test';

test('sales order pagination and view details', async ({ page }) => {
    // Produžavamo timeout za ceo test
    test.setTimeout(120000); // 2 minuta

    // --- LOGIN ---
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera da li je redirectovao na landing page
    await expect(page).toHaveURL(/landing-page/);

    // --- SALES PAGE ---
    await page.getByRole('button', { name: 'Sales' }).click();

    // --- PAGINATION ---
    await page.getByLabel('Go to next page').click({ timeout: 10000 });
    await page.getByLabel('Go to next page').click({ timeout: 10000 });
    await page.getByLabel('Go to next page').click({ timeout: 10000 });

    // --- VIEW DETAILS OF FIRST ORDER ---
    await page.getByText(/Sales Order #1/i).click();
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();

    // --- PAGINATION BACK AND VIEW ANOTHER ORDER ---
    await page.getByLabel('Go to previous page').click({ timeout: 10000 });
    await page.getByText(/Sales Order #5/i).click();
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
});