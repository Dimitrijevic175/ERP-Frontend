import { test, expect } from '@playwright/test';

test('products filtering and pagination', async ({ page }) => {

    // Otvori login stranicu
    await page.goto('/login');

    // Popuni email i password
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

    // Klikni na login
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera da li je redirectovao na landing page
    await expect(page).toHaveURL(/landing-page/);

    // Otvori products stranicu
    await page.getByRole('button', { name: 'Products' }).click();

    // Filtriramo po name i sku
    await page.locator('input[name="name"]').fill('cement');
    await page.locator('input[name="sku"]').fill('cem-bel-25');
    await page.getByRole('button', { name: 'Search' }).click();

    // Provera da li su rezultati filtrirani kako treba
    await expect(page.locator('table')).toContainText('cement');
    const tableText = await page.locator('table').textContent();
    expect(tableText?.toLowerCase()).toContain('cem-bel-25');

    // restartujemo filtere
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="sku"]').fill('');
    await page.getByRole('button', { name: 'Search' }).click();

    // filtriramo po brandu
    await page.locator('input[name="brand"]').fill('gradnjaplus');
    await page.getByRole('button', { name: 'Search' }).click();

    // Provera brand filtera
    const tableText1 = await page.locator('table').textContent();
    expect(tableText1?.toLowerCase()).toContain('gradnjaplus');

    // restratujemo filtere
    await page.locator('input[name="brand"]').fill('');
    await page.getByRole('button', { name: 'Search' }).click();

    // proveravamo paginaciju
    await page.getByLabel('Go to next page').click();
    await page.getByLabel('Go to next page').click();
});