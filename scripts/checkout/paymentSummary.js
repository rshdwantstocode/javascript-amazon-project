import { cart } from "../../data/cart.js";
import { moneyMatters } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDelivery } from "../../data/deliveryOption.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    let priceCents = 0;
    let shippingPriceCents = 0;
    let cartItemQuantity =  0;

    cart.forEach((cartItem)=> {
        const product  = getProduct(cartItem.productId);
        cartItemQuantity += cartItem.quantity;
        priceCents += product.priceCents * cartItem.quantity;

        const deliveryOption =  getDelivery(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

        const totalBeforeTax = priceCents + shippingPriceCents;
        const estimatedTax = totalBeforeTax * 0.1;
        const totalPriceCents = totalBeforeTax + estimatedTax;
        
        const paymentHTML = `
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (${cartItemQuantity}):</div>
                    <div class="payment-summary-money">$${moneyMatters(priceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${moneyMatters(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${moneyMatters(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${moneyMatters(estimatedTax)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${moneyMatters(totalPriceCents)}</div>
                </div>

                <button class="place-order-button button-primary js-place-order">
                    Place your order
                </button>
        `
        document.querySelector('.js-payment-summary')
                .innerHTML = paymentHTML;

        document.querySelector('.js-place-order')
                .addEventListener('click', async () => {
                try  {
                    const response = await fetch('https://supersimplebackend.dev/orders', {
                        method: 'POST',
                        headers:  {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cart: cart
                        })
                    });

                    const order = await response.json();
                    // console.log(typeof order);
                    // console.log(order);
                    addOrder(order);

                } catch (error) {
                    console.log('Unexpected error. Try again later.');
                }
                
                window.location.href = 'orders.html';
            });
};