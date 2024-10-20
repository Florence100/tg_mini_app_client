import { configureStore } from '@reduxjs/toolkit';
import cartReduser from '../features/cart/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReduser
    }
})

export default store;