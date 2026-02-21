import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 120000,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 60000,
        baseURL: 'http://localhost:5173',

        launchOptions: {
            slowMo: 2000,
        },
    },
});