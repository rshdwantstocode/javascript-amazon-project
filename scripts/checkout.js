import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from "../data/products.js"
import { loadCartFetch } from "../data/cart.js";
// import '../data/car.js';
// import  "../data/backend-practice.js";


async function loadPage() {
    try {
        // throw 'error1'
    await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
    ])
    
    } catch (error) {
        console.log(error);
    }

    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();




/*
Promise.all([
    
    loadProductsFetch(),
    
    new Promise((resolve)=> {
        loadCart(() =>  {
            resolve();
        });
    })

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/






// new Promise((resolve)=> {
//     loadProducts(() =>  {
//         resolve();
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// loadProducts(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });



