import{test,expect} from '@playwright/test'

test("Navigate to a retail site and perform search and click actions", async({page})=>{
    await page.goto("https://www.amazon.in")
    await expect(page).toHaveTitle(/Online Shopping/i)
    await page.getByRole('searchbox', {name:"Search Amazon.in"}).fill("Iphone17")
    await page.keyboard.press('Enter')
    const firstProduct = page.getByRole('link', { name: /iPhone 17/i }).first();
    await firstProduct.click();
})