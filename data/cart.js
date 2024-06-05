export const cart  = [];

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