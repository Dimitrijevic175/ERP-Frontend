import { test, expect } from '@playwright/test';

test('logout test', async ({ page }) => {
    test.setTimeout(60000); // ceo test timeout 60s

    // --- LOGIN ---
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Provera redirecta
    await expect(page).toHaveURL(/landing-page/);

    // --- LOGOUT ---
    // Klik na user menu (meni sa imenom korisnika)
    await page.getByRole('button', { name: /Admin/i }).click();

    // Klik na Sign out
    await page.getByRole('menuitem', { name: 'Sign out' }).click();

    // Provera da li je redirectovao nazad na login
    await expect(page).toHaveURL(/login/);
});