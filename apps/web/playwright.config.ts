import { fileURLToPath } from 'url';
import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: 'src/__e2e__' }),
  testMatch: '**/*.spec.{ts,tsx}',
  testDir: 'src/__e2e__',
  outputDir: 'output/playwright/results',
  retries: 2,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'output/playwright/report' }],
  ],
  use: {
    baseURL,
    screenshot: 'on',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm exec nx run @org/web:preview',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  projects: [
    { name: 'Desktop Chrome', use: devices['Desktop Chrome'] },
    { name: 'Desktop Firefox', use: devices['Desktop Firefox'] },
    { name: 'Desktop Safari', use: devices['Desktop Safari'] },
    { name: 'Mobile Chrome', use: devices['Pixel 5'] },
    { name: 'Mobile Safari', use: devices['iPhone 12'] },
  ],
});
