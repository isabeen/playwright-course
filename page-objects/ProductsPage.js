import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "../utils/isDesktopViewport"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }


    visit = async () => {
    await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const addSpecificButton = this.addButtons.nth(index)
        await addSpecificButton.waitFor()
        await expect(addSpecificButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)

        //undefined variable
        let basketCountBeforeAdding  
        // only run on desktop viewport
        if (isDesktopViewport(this.page)) {
             basketCountBeforeAdding = await navigation.getBasketCount()
        }
        await addSpecificButton.click()
        await expect(addSpecificButton).toHaveText("Remove from Basket")

        // only run on desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
            }
       

    }


    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting)
    }


}