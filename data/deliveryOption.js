export const deliveryOptions= [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
    },
        {
        id: '2',
        deliveryDays: 3,
        priceCents: 499,   
        },
            {
            id: '3',
            deliveryDays: 2,
            priceCents: 999,
            }
];

export function getDelivery(deliveryOptionId) {
    let deliveryDateOption;
    
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryDateOption = option;
        }
    });

    return deliveryDateOption || deliveryOptions[0];
}