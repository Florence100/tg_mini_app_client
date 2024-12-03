import { configureStore } from '@reduxjs/toolkit';
import cartReduser from '../features/cart/cartSlice';
import formReduser from '../common/components/orderForm/formSlice.js';

const store = configureStore({
    reducer: {
        cart: cartReduser,
        form: formReduser
    }
})

export default store;