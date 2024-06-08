import { cart, removefromCart
            ,calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyMatters } from "./utils/money.js";
// import { updateCartQuantity } from "./amazon.js";

let matchingProduct;
let orderSummaryHTML =  '';


cart.forEach((cartItem)=>{
    const productID = cartItem.productId;

    products.forEach((product)=>{
        if (product.id === productID) {
            matchingProduct = product;
        };
    });
    

orderSummaryHTML += `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                            <span class="update-quantity-link link-primary js-update-cart"
                            data-product-id=${matchingProduct.id}>
                                Update
                            </span>
                            <input class="quantity-input">
                            <span class="save-quantity-link link-primary">Save</span>
                                
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
            <div class="delivery-option">
            <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>`;
});



function updateCartQuantity(){
    const totalCartQuantity = calculateCartQuantity();

    document.querySelector('.js-checkout-items')
            .innerHTML = `${totalCartQuantity} items`;
};

updateCartQuantity();


document.querySelector('.js-order-summary')
        .innerHTML = orderSummaryHTML;

document.querySelectorAll('.js-delete-cart')
        .forEach((link)=>{
                link.addEventListener('click', ()=>{
                const productId = link.dataset.productId;
                    removefromCart(productId);
                
                    updateCartQuantity();
                const container =  document.querySelector(
                    `.js-cart-item-container-${productId}`);
                    container.remove();
                

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