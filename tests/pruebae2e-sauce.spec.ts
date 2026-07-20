import { test, expect } from '@playwright/test';

test('Compra completa de Sauce Labs Fleece Jacket', async ({ page }) => {

    // 1. Ingresar a la página
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    const validUser = 'standard_user';
    const password = 'secret_sauce';

    await page.locator('#user-name').fill(validUser);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();

    // Validar que ingresó correctamente
    await expect(page).toHaveURL(/inventory/);

    // 3. Buscar el producto
    const product = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Fleece Jacket'
    });

    // 4. Guardar nombre y precio
    const productName = await product.locator('.inventory_item_name').textContent();
    const productPrice = await product.locator('.inventory_item_price').textContent();

    // 5. Agregar al carrito
    await product.locator('button').click();

    // 6. Ir al carrito
    await page.locator('.shopping_cart_link').click();

    // Validar nombre
    const cartName = await page.locator('.inventory_item_name').textContent();

    // Validar precio
    const cartPrice = await page.locator('.inventory_item_price').textContent();

    expect(cartName).toBe(productName);
    expect(cartPrice).toBe(productPrice);

    // 7. Checkout
    await page.locator('#checkout').click();

    // Completar información
    await page.locator('#first-name').fill('Enrique');
    await page.locator('#last-name').fill('Rodas');
    await page.locator('#postal-code').fill('110111');

    await page.locator('#continue').click();

    // Finalizar compra
    await page.locator('#finish').click();

    // Validar compra exitosa
    await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');
});

