import { test, expect } from "@playwright/test"

//test is a function and it takes two arguments
//first argument is  the name of the string
//second argument is the function

test.skip("Product Page Add To Basket", async ({ page }) => {
    await page.goto("/")

    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    const checkoutLink = page.getByRole('link', { name: 'Checkout' })

   
   

    await addToBasketButton.waitFor()
    await expect(basketCounter).toHaveText("0")
    await expect(addToBasketButton).toHaveText("Add to Basket")
    

    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    await checkoutLink.waitFor()
    await expect(checkoutLink).toHaveText("Checkout")
    await checkoutLink.click()
    await page.waitForURL("/basket")
   

   

   //await page.pause()

})
