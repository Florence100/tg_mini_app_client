import { configureStore } from '@reduxjs/toolkit';
import cartReduser from '../features/cart/cartSlice';
import formReduser from '../features/orderForm/formSlice.js';

const store = configureStore({
    reducer: {
        cart: cartReduser,
        form: formReduser
    }
})

export default store;