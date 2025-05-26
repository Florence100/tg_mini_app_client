import { createSlice } from '@reduxjs/toolkit';

// state = {
//     entities: {
//         1: {
//             count: 1,
//             name: '...',
//             price: 25,
//             count: 1,
//             img: '...'
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
            const images = productItem?.images.map((image) => image.src);

            state.entities[productItem.id] = {
                id: productItem.id,
                name: productItem.name,
                price: productItem.price,
                count: 1,
                img: images[0]
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