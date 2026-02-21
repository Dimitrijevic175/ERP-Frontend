import { test, expect } from '@playwright/test';

test('purchase order pagination and view details', async ({ page }) => {

    // --- LOGIN ---
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera da li je redirectovao na landing page
    await expect(page).toHaveURL(/landing-page/);

    // --- PURCHASE ORDERS PAGE ---
    await page.getByRole('button', { name: 'Purchase Orders' }).click();

    // --- PAGINATION ---
    await page.getByLabel('Go to next page').click({ timeout: 10000 });
    await page.getByLabel('Go to next page').click({ timeout: 10000 });

    // --- VIEW DETAILS OF FIRST ORDER ---
    await page.getByText(/Purchase Order #1/i).click();
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();

    // --- PAGINATION BACK ---
    await page.getByLabel('Go to previous page').click({ timeout: 10000 });
    await page.getByLabel('Go to previous page').click({ timeout: 10000 });

    // --- VIEW DETAILS OF ANOTHER ORDER ---
    await page.getByText(/Purchase Order #9/i).click();
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
});