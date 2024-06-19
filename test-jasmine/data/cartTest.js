import {addtoCart, cart, LoadFromStorage} from '../../data/cart.js';

describe('test suite: addtoCart', ()=> {
    it('add an existing product to the Cart', ()=>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{ 
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]); 
        });
        LoadFromStorage();

        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('add a new product to the Cart', ()=>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{ 
            return JSON.stringify([]); 
        });
        LoadFromStorage();

        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});