export let cart;

LoadFromStorage();

export function LoadFromStorage() {
    cart  = JSON.parse(localStorage.getItem('cart')); 

  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  }
}


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtoCart(productId){
    let matchItem;
    let messageTimeoutId;

    //process to check if the item is already in the cart
    cart.forEach((cartItems)=>{
        if (productId === cartItems.productId) {
            matchItem = cartItems;
        };
    });

    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); //for the quantity value
    let quantity = Number(quantitySelector.value);

    if (matchItem) {
        matchItem.quantity += 1 ;
    } else {
        cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
      });
    };

    saveToStorage();

    // Added paragraph sign
    let addedStyle = document.querySelector(`.js-added-cart-${productId}`);
    addedStyle.classList.add('added-to-cart-visible');  

    setTimeout(() => {
      if (messageTimeoutId) {
        clearTimeout(messageTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        addedStyle.classList.remove('added-to-cart-visible');
      }, 2000);
      messageTimeoutId = timeoutId;
    });
};


export function removefromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    };
  });
  
  cart = newCart;

  saveToStorage();
}


export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


export function updateQuantity(productId, newQuantity) {
  let cartQuantity;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
        cartQuantity = cartItem;
    }
  });
  cartQuantity.quantity = newQuantity;
  saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchItem;

  //process to check if the item is already in the cart
  cart.forEach((cartItems)=>{
      if (productId === cartItems.productId) {
          matchItem = cartItems;
      };
  });

  matchItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}


export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=> {
      console.log(xhr.response);

      func();
  });


  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};