import { test, expect } from '@playwright/test';

test('warehouse stock view and pagination', async ({ page }) => {

    // Otvori login stranicu
    await page.goto('/login');

    // Popuni login formu
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

    // Klikni na login dugme
    await page.getByRole('button', { name: 'Login' }).click();

    // Sačekaj da se landing page učita
    await expect(page).toHaveURL(/landing-page/);

    // Klik na Warehouses meni
    await page.getByRole('button', { name: 'Warehouses' }).click();

    // Klik na "View Stock" za treći warehouse (indeks 2)
    await page.getByRole('button', { name: 'View Stock' }).nth(2).click();

    // Sačekaj da se tabela učita
    const tableLocator = page.locator('table');
    await expect(tableLocator).toBeVisible({ timeout: 10000 });

    // Paginacija - idemo na sledeću stranu
    await page.getByLabel('Go to next page').click({ timeout: 10000 });

    // Filter - klik na "View low stock"
    await page.getByRole('button', { name: 'View low stock' }).click();

    // Provera da tabela još uvek postoji
    await expect(tableLocator).toBeVisible({ timeout: 10000 });
});