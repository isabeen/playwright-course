import { expect } from "@playwright/test"


export class PaymentPage{

    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activeDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.creditCardValidUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }


    activateDiscount = async () => {
        await this.discountCode.waitFor()

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        // const totalPrice = this.totalValue.innerText()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for laggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        // Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.activeDiscountButton.waitFor()
        await this.activeDiscountButton.click()
        
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()
        const discountedValueText = await this.discountedValue.innerText()
        const discountedValueOnlyStringNumber = discountedValueText.replace("$", "")
        const discountedValueNumber = parseInt(discountedValueOnlyStringNumber, 10)


        // expect(totalPrice).not.toEqual({discountedValueText})

        expect(discountedValueNumber).toBeLessThan(totalValueNumber)
        }


        fillPaymentDetails = async (paymentDetails) => {
            await this.creditCardOwnerInput.waitFor()
            await this.creditCardOwnerInput.fill(paymentDetails.owner)
            await this.creditCardNumberInput.waitFor()
            await this.creditCardNumberInput.fill(paymentDetails.number)
            await this.creditCardValidUntilInput.waitFor()
            await this.creditCardValidUntilInput.fill(paymentDetails.validUntil)
            await this.creditCardCvcInput.waitFor()
            await this.creditCardCvcInput.fill(paymentDetails.cvc)
            
        }

        completePayment = async() => {
            await this.payButton.waitFor()
            await this.payButton.click()
            await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
        }

}