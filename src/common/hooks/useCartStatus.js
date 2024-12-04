import { useSelector } from 'react-redux';

const getCartItems = (entities) => {
    return Object.values(entities).map(item => ({
        id: item.id,
        count: item.count,
        price: item.price,
        name: item.name
    }));
};

const getCartAmount = (cartItems) => {
    const cartAmount = cartItems.reduce((currentSum, currentNumber) => {
        return currentSum + ( currentNumber.count * currentNumber.price );
    }, 0)
    
    return +cartAmount.toFixed(2);
}

export default function useCartStatus() {
    const entities = useSelector(state => state.cart.entities);
    const isCartEmpty = Object.keys(entities).length > 0 ? false : true;
    const cartItems = getCartItems(entities);
    const cartAmount = getCartAmount(cartItems);

    return {
        isCartEmpty,
        cartItems,
        cartAmount
    }
}