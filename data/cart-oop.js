function Cart(localStorageKey){
    const cart = {
        cartItem: undefined,
    
        LoadFromStorage() {
            this.cartItem  = JSON.parse(localStorage.getItem(localStorageKey)); 
        
        if (!this.cartItem) {
                this.cartItem = [
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
        },
    
            
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
        },
        
        addtoCart(productId){
            let matchItem;
            let messageTimeoutId;
        
            //process to check if the item is already in the cart
            this.cartItem.forEach((cartItems)=>{
                if (productId === cartItems.productId) {
                    matchItem = cartItems;
                };
            });
        
            let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); //for the quantity value
            console.log(quantitySelector);
            let quantity = Number(quantitySelector.value);
        
            if (matchItem) {
                matchItem.quantity += 1 ;
            } else {
                this.cartItem.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            };
        
            this.saveToStorage();
        
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
        },
    
        removefromCart(productId) {
                const newCart = [];
            
                this.cartItem.forEach((cartItem)=>{
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem)
                };
                });
                
                this.cartItem = newCart;
            
                this.saveToStorage();
            },
    
        calculateCartQuantity(){
                let cartQuantity = 0;
                this.cartItem.forEach(cartItem => {
                    cartQuantity += cartItem.quantity;
                });
                
                return cartQuantity;
            },
        
        updateQuantity(productId, newQuantity) {
            let cartQuantity;
            this.cartItem.forEach(cartItems => {
                if (cartItems.productId === productId) {
                    cartQuantity = cartItems;
                }
            });
            cartQuantity.quantity = newQuantity;
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
                let matchItem;
            
                //process to check if the item is already in the cart
                this.cartItem.forEach((cartItems)=>{
                    if (productId === cartItems.productId) {
                        matchItem = cartItems;
                    };
                });
            
                matchItem.deliveryOptionId = deliveryOptionId;
            
            this.saveToStorage();
        }
        
    }

    return cart
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');

businessCart.LoadFromStorage();
cart.LoadFromStorage();

console.log(cart);
console.log(businessCart);

