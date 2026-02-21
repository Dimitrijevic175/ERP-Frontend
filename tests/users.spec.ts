import { test, expect } from '@playwright/test';

test('users filtering and pagination', async ({ page }) => {

    // Otvori login stranicu
    await page.goto('/login');

    // Popuni login formu
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

    // Klikni na login dugme
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera da li je redirectovao na landing page
    await expect(page).toHaveURL(/landing-page/);

    // Klik na Users meni
    await page.getByRole('button', { name: 'Users' }).click();

    // --- Filtriranje po imenu ---
    const userSearchInput = page.getByRole('textbox');
    await userSearchInput.fill('admin');
    await page.getByRole('button', { name: 'Search' }).click();

    // Provera da tabela sadrži admina
    const tableLocator = page.locator('table');
    await expect(tableLocator).toContainText('admin');

    // Restartujemo filter
    await userSearchInput.fill('');
    await page.getByRole('button', { name: 'Search' }).click();

    // --- Filtriranje po role (custom dropdown) ---
    const roleComboButton = page.getByRole('combobox');
    await roleComboButton.click(); // otvori dropdown
    await page.getByRole('option', { name: 'WAREHOUSE' }).click(); // izaberi opciju
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(tableLocator).toContainText('WAREHOUSE', { timeout: 10000 });

    // Reset role filter
    await roleComboButton.click();
    await page.getByRole('option', { name: 'All' }).click();
    await page.getByRole('button', { name: 'Search' }).click();

    // --- Paginacija ---
    await page.getByLabel('Go to next page').click({ timeout: 10000 });
    await page.getByLabel('Go to next page').click({ timeout: 10000 });
    await page.getByLabel('Go to previous page').click({ timeout: 10000 });

    // Provera da tabela i dalje postoji
    await expect(tableLocator).toBeVisible({ timeout: 10000 });
});