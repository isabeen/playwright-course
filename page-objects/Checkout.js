import { expect } from "@playwright/test"

export class Checkout {


    constructor (page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }


    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()

        const itemsBeforeRemoval = await this.basketCards.count()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        
        //{ allPriceTexts: [ '499$', '599$', '320$' ] }

        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "") // 499$ -> 499
            return parseInt(withoutDollarSign, 10)
            console.warn({element})
        })
        // console.warn({allPriceTexts})
        // console.warn({justNumbers})

        const smallestPrice = Math.min(justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)  
   }


   continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click( )
        //query parameter URL, takes help from website Regex101
        await this.page.waitForURL(/\/login/, {timeout: 3000})  

   }

}