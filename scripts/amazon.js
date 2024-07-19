import { cart, addtoCart
        ,calculateCartQuantity } from '../data/cart.js';
import { products,loadProducts } from '../data/products.js';
// import { moneyMatters } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productHTML = ''; 

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');


  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
        let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
      });
  };

  filteredProducts.forEach((product) => {
      productHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsURL()}">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-cart-${product.id} ">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
  });


  let generateProductHTML = document.querySelector('.js-product-grid');
      generateProductHTML.innerHTML = productHTML;



    function updateCartQuantity() {
      const totalCartQuantity = calculateCartQuantity();

      document.querySelector('.js-cart-quantity')
              .innerHTML = totalCartQuantity;
      }
      updateCartQuantity();


  let addCart = document.querySelectorAll('.js-add-to-cart');
  addCart.forEach((button)=>{

      button.addEventListener('click', ()=>{
            const { productId }  =  button.dataset;
            addtoCart(productId);
            updateCartQuantity();
      });
  });

  document.querySelector('.js-search-button')
          .addEventListener('click', () => {
            const search = document.querySelector('.js-search-bar').value;
            window.location.href = `amazon.html?search=${search}`
          });

  document.querySelector('.js-search-bar')
          .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              const searchItem = document.querySelector('.js-search-bar').value;
              window.location.href = `amazon.html?search=${searchItem}`
            }
          });
};
