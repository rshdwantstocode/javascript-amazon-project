import { cart, removefromCart,
    calculateCartQuantity,
    updateQuantity,
    updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { moneyMatters } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDelivery,
            calculateDeliveryDate} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";



export function renderOrderSummary() {  
let cartSummaryHTML =  '';   


cart.forEach((cartItem)=>{

    const productID = cartItem.productId;
    const matchingProduct =  getProduct(productID);


    const deliveryOptionId =  cartItem.deliveryOptionId;
    const deliveryDateOption = getDelivery(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryDateOption);

cartSummaryHTML += `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                    <div class="product-price">
                    $${moneyMatters(matchingProduct.priceCents)}
                    </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                            <span class="update-quantity-link link-primary js-update-cart"
                            data-product-id=${matchingProduct.id}>
                                Update
                            </span>

                            <input type="number" class="quantity-input js-quantity-${matchingProduct.id}">
                            <span class="save-quantity-link link-primary js-save-cart"
                            data-product-id=${matchingProduct.id}>Save</span>
                                
                                <span class="delete-quantity-link link-primary 
                                    js-delete-cart" data-product-id=${matchingProduct.id}>
                                        Delete
                                </span>
                    </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>`;
});


function deliveryOptionsHTML(matchingProduct, cartItem) { 
    let html = '';
    deliveryOptions.forEach((delivery)=> {
    const dateString = calculateDeliveryDate(delivery);

    const priceString = delivery.priceCents === 0 ? 'FREE': `$${moneyMatters(delivery.priceCents)}`;

    const isChecked = delivery.id === cartItem.deliveryOptionId;

        html += ` <div class="delivery-option js-delivery-option"
                    data-product-id=${matchingProduct.id} data-delivery-option-id=${delivery.id}>

                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <class="delivery-option-date">
                            ${dateString}
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
        </div>`
    });

    return html;
}


renderCheckoutHeader();


document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-cart')
        .forEach((link)=>{
                link.addEventListener('click', ()=>{
                    const productId = link.dataset.productId;
                        removefromCart(productId);
                    
                    renderCheckoutHeader();
                    renderOrderSummary();
                    renderPaymentSummary(); 
                });
        });

document.querySelectorAll('.js-update-cart')
        .forEach((link) => {
                link.addEventListener('click', ()=> {
                    const updateproductId = link.dataset.productId;

                    const updateContainer = document.querySelector(`.js-cart-item-container-${updateproductId}`);
                            updateContainer.classList.add("is-editing-quantity");
                });
        });

document.querySelectorAll('.js-save-cart')
        .forEach((link)=>{
            link.addEventListener('click', ()=> {
                const updateproductId = link.dataset.productId;

                const inputValue = document.querySelector(`.js-quantity-${updateproductId}`);
                let newQuantity = Number(inputValue.value);

                if (newQuantity <= 0 || newQuantity >= 500) {
                    alert("Quantity must be 0  to 500");
                    return;
                }  

                updateQuantity(updateproductId, newQuantity);

                const container = document.querySelector(`.js-cart-item-container-${updateproductId}`);
                container.classList.remove('is-editing-quantity');

                renderOrderSummary();
                renderPaymentSummary();
                renderCheckoutHeader();
            });

        });

document.querySelectorAll('.js-delivery-option')
        .forEach((element)=> {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}
