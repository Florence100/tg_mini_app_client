import { createSlice } from '@reduxjs/toolkit';

// state = {
//     entities: {
//         1: {
//             count: 1,
//         },
//         ...
//     },
// }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        entities: {}
    },
    reducers: {
        add: (state, action) => {
            const productItem = action.payload;
            state.entities[productItem.id] = {
                count: 1,
            }
        },
        remove: (state, action) => {
            const productItem = action.payload;
            delete state.entities[productItem.id];
        },
        decrement: (state, action) => {
            const productItem = action.payload;
            state.entities[productItem.id].count -= 1;
        },
        increment: (state, action) => {
            const productItem = action.payload;
            state.entities[productItem.id].count += 1;
        },
        setCart: (state, action) => {
            const items = action.payload;
            state.entities = items.reduce((acc, item) => {
                acc[item.id] = { count: item.count };
                return acc;
            }, {});
        },
        clearCart: (state, action) => {
            state.entities = {};
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, decrement, increment, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;