export const cart  = [];

export function addtoCart(productId){
    let matchItem;
    let messageTimeoutId;

    cart.forEach((item)=>{
        if (productId === item.productId) {
            matchItem = item;
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