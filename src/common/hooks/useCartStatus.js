import { useSelector } from 'react-redux';


function useIsCartEmpty() {
    const entities = useSelector(state => state.cart.entities);
    return Object.keys(entities).length > 0 ? false : true;
}

function useCartItems() {
    const entities = useSelector(state => state.cart.entities);
    const cartItems = Object.values(entities);

    return cartItems;
}

function useCartAmount() {
    const entities = useSelector(state => state.cart.entities);
    const cartItems = Object.values(entities);
    const cartAmount = cartItems.reduce((currentSum, currentNumber) => {
        return currentSum + ( currentNumber.count * currentNumber.price );
    }, 0)
    
    return +cartAmount.toFixed(2);
}


export { useIsCartEmpty, useCartItems, useCartAmount }