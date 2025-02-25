import { configureStore } from '@reduxjs/toolkit';
import { cartReduser, add, remove, decrement, increment, clearCart, setCart } from 'modules/Cart/index';
import { formReduser } from 'modules/OrderForm/index';

const store = configureStore({
    reducer: {
        cart: cartReduser,
        form: formReduser
    }
})

export {
    store,
    clearCart,
    add,
    remove,
    decrement,
    increment,
    setCart
};