import { cart, addtoCart } from "./cart.js";
import { moneyMatters } from "../scripts/utils/money.js";
import { getProduct} from "./products.js";
import { getDelivery, calculateDeliveryDate } from "./deliveryOption.js";
import { loadProductsFetch } from "./products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { updateCartQuantity } from "../scripts/amazon.js";


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

async function loadPage() {
        await loadProductsFetch();

        let ordersHTML = '';
        orders.forEach((order) => {
            // console.log(order);
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    
        ordersHTML += `
            <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTimeString}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${moneyMatters(order.totalCostCents)}</div>
                </div>
                </div>
                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
                </div>
            </div>
                <div class="order-details-grid">
                    ${productsListHTML(order)}
                </div>
            </div>
        `;
        });
    
function productsListHTML(order) {
    let productsListHTML = '';
    
            order.products.forEach((productDetails) => {
                const product = getProduct(productDetails.productId);
                console.log(product.id);
        
                productsListHTML += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>
                <div class="product-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-delivery-date">
                    Arriving on: ${
                        dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                    }
                    </div>
                    <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again"
                    data-product-id="${product.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>
                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary
                    js-track-order">
                        Track package
                    </button>
                    </a>
                </div>
                `;
            });
    
        return productsListHTML;
    }
    
    document.querySelector('.js-order-grid').innerHTML = ordersHTML;

    document.querySelectorAll('.js-buy-again').forEach((button)=>{

        button.addEventListener('click', ()=>{
                const { productId }  =  button.dataset;
                addtoCart(productId);
                updateCartQuantity();
                // addtoCart(button.dataset.productId);

                button.innerHTML = 'Added';
                setTimeout(()=>{
                    button.innerHTML = `
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        `;
                    }, 1000);
            });
        });
        updateCartQuantity();
}
    
loadPage();



export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
        matchingOrder = order;
        }
    });

    return matchingOrder;
}


export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}



