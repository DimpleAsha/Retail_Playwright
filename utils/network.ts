import type { Page, Route } from '@playwright/test';

export async function setupNetworkInterception(page: Page) {
  await page.route('**/*', (route: Route) => {
    const type = route.request().resourceType();
    if (['image', 'font', 'media'].includes(type)) return route.abort();
    route.continue();
  });
  
  // common error handling
  await page.route('**/api/**', async (route: Route) => {
    const res = await route.fetch();
    if (res.status() >= 400) console.error(`API Error: ${res.status()}`);
    route.fulfill({ response: res });
  });
}
