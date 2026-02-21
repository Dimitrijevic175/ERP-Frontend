import { test, expect } from '@playwright/test';

test('navigate to Contact Us page', async ({ page }) => {

    // --- LOGIN ---
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();


    // Provera redirecta
    await expect(page).toHaveURL(/landing-page/);

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

    // --- NAVIGACIJA DO CONTACT US ---
    await page.getByRole('button', { name: 'Contact us' }).click();

});