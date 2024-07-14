import {addtoCart, cart, LoadFromStorage} from '../../data/cart.js';

console.log(cart[0]);

describe('test suite: addtoCart', ()=> {
    it('add an existing product to the Cart', ()=>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{ 
            return JSON.stringify([{
                productId: `${cart[0].productId}`,
                quantity: cart[0].quantity,
                deliveryOptionId: cart[0].deliveryOptionId
            }]); 
        });
        LoadFromStorage();

        addtoCart(cart[0].productId);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(cart[0].productId);
        expect(cart[0].quantity).toEqual(cart[0].quantity);
    });

    it('add a new product to the Cart', ()=>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{ 
            return JSON.stringify([
                {productId: `${cart[0].productId}`,
                quantity: cart[0].quantity,
                deliveryOptionId: cart[0].deliveryOptionId}
            ]); 
        });
        LoadFromStorage();


        addtoCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(4);
    });
});