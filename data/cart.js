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
    
  if (quantitySelector) {
      if (matchItem) {
          matchItem.quantity += 1 ;
      } else {
          cart.push({
            productId,
            quantity:  Number(quantitySelector.value),
            deliveryOptionId: '1'
        });
      };
  }

    saveToStorage();

    // Added paragraph sign
    let addedStyle = document.querySelector(`.js-added-cart-${productId}`);

    if (addedStyle) {
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
    }
    
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


export async function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=> {
      console.log(xhr.response);

      func();
  });


  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const result  = await response.text();
  console.log(result);

  return result;
}

/*
async function Greeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const text = await response.text();
  console.log(text);


  console.log(promise);
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
  });

  xhr.open('GET', 'https://supersimplebackend.dev/greeting');
  xhr.send();
  return promise;
}

async function GetAmazon() {
  try {
    const result = await fetch('https://Amazon.com');
    console.log( await result.json());
  } catch (error) {
    console.log(error);
      console.log('CORS');
  }
}


async function SendName() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Ali'
          })
        });
        const promise = await response.text();
        console.log(promise);
    } catch (error) {
      console.log(error);
    }
}

async function GreetingBackend() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.status >= 400){
      throw response;
    }
    console.log(await response.text());

  } catch (error) {
    if (error.status === 400) {
        console.log(await error.json());
    } else {
      console.log('Network error.Please try again');
    }
  }

  const promise = await response.json();
  console.log(promise);
}
*/