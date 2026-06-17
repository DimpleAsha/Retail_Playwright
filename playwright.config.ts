import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  
  
  // Clean boolean check to avoid type mixing evaluation bugs
  workers: process.env.CI ? '100%' : 1,
  retries: process.env.CI ? 2 : 0,
  
  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright'],
    ['list'],
    /*['./reporters/jiraReporters.ts',
      {
        // Safe: Guaranteed strings passed to the jira custom reporter
        u: process.env.JIRA_USER || 'MISSING',
        token: process.env.JIRA_TOKEN || 'MISSING'
      }
    ]*/
  ],

  use: {
    // Fallback default just in casew local environment file is missing the URL
    //baseURL: process.env.UI_URL || 'http://localhost:3000',
    headless: !!process.env.CI, // Automatically runs headless in CI, headed locally
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    //{ name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],} //storageState: 'playwright/.auth/user.json',}
      //dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],}// storageState: 'playwright/.auth/user.json' },
      //dependencies: ['setup'],
    },
  ],
});