import { configureStore } from '@reduxjs/toolkit';
import { cartReduser } from '../modules/Cart/index';
import { formReduser } from '../modules/OrderForm/index';

const store = configureStore({
    reducer: {
        cart: cartReduser,
        form: formReduser
    }
})

export default store;