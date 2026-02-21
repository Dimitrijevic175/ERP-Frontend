import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
    // Otvori login stranicu
    await page.goto('/login');

    // Popuni email i password
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

    // Klikni na login
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera da li je redirectovao na landing page
    await expect(page).toHaveURL(/landing-page/);

    // Sačuvaj state
    await page.context().storageState({ path: 'storageState.json' });
});