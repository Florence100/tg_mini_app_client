import { createSlice } from '@reduxjs/toolkit';

// state = {
//     entities: {
//         1: {
//             id: 1,
//             count: 1,
//             price: 5.2,
//             name: 'burger'
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
                id: productItem.id,
                count: 1,
                price: productItem.price,
                name: productItem.name
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
        clearCart: (state, action) => {
            state.entities = {};
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, decrement, increment, clearCart } = cartSlice.actions;

export default cartSlice.reducer;