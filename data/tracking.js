import { loadProductsFetch, getProduct } from "./products.js";
import { getOrder } from "./orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


async function loadPage() {
    await loadProductsFetch();
    let trackHTML = '';


    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);


    
    let productDetails;
    order.products.forEach((details) => {
        if (details.productId === product.id) {
        productDetails = details;
        }
    });

    // console.log(order);
    // console.log(productDetails);

    const orderTime = (dayjs(order.orderTime).format('YYMMDD'));
    const deliveryTime = (dayjs(productDetails.estimatedDeliveryTime).format('YYMMDD'));
    let currentTime = (dayjs().format('YYMMDD'));
    // console.log(orderTime);
    // console.log(deliveryTime);
    // console.log(currentTime);

    let deliveryPercentage = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
    console.log(deliveryPercentage);

    trackHTML += `
        <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
                </a>

                <div class="delivery-date">
                Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
                </div>

                <div class="product-info">
                ${product.name}
                </div>

                <div class="product-info">
                Quantity: ${productDetails.quantity}
                </div>

                <img class="product-image" src=${product.image}>

                <div class="progress-labels-container">
                <div class="progress-label preparing">
                    Preparing
                </div>
                <div class="progress-label shipping">
                    Shipped
                </div>
                <div class="progress-label delivered">
                    Delivered
                </div>
                </div>

                <div class="progress-bar-container">
                <div class="progress-bar" style="width:${deliveryPercentage}%"></div>
                </div>
        </div>
    `

    document.querySelector('.js-track-grid').innerHTML = trackHTML;

    const preparing = document.querySelector('.preparing');
    const shipping = document.querySelector('.shipping');
    const delivered = document.querySelector('.delivered');

    if (deliveryPercentage < 50) {
        if (preparing) {
            preparing.classList.add('current-status');
        }
    } else if (deliveryPercentage >= 50 && deliveryPercentage < 100) {
        if (shipping) {
            shipping.classList.add('current-status');
        }
    } else {
        if (delivered) {
            delivered.classList.add('current-status');
        }
    }
}
loadPage();