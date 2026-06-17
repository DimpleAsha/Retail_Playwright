# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Navigate to a retail site and perform serach and click actions
- Location: tests\example.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: /Online Shopping/i
Received: Promise {}
```

# Test source

```ts
  1  | import{test,expect} from '@playwright/test'
  2  | 
  3  | test("Navigate to a retail site and perform serach and click actions", async({page})=>{
  4  |     await page.goto("https://www.amazon.in")
  5  |     const pageTitle = page.title()
> 6  |     expect(pageTitle).toBe(/Online Shopping/i)
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  7  |     await page.getByRole('searchbox', {name:"Search Amazon.in"}).fill("Iphone17")
  8  |     await page.keyboard.press('Enter')
  9  |     const firstProduct = page.getByRole('link', { name: /iPhone 17/i }).first();
  10 |     await firstProduct.click();
  11 | })
```