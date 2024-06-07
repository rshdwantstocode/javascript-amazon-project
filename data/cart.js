export let cart  = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  }
];

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
        matchItem.quantity += quantity ;
    } else {
        cart.push({
          productId,
          quantity
      });
    };

    //Added paragraph sign
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
}