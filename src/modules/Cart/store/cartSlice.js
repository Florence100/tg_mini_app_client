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
            state.entities[productItem.id] = {
                id: productItem.id,
                name: productItem.name,
                price: productItem.price,
                count: 1,
                img: productItem.img
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
        // setCart: (state, action) => {
        //     const items = action.payload;
        //     state.entities = items.reduce((acc, item) => {
        //         acc[item.id] = { 
        //             id: item.id,
        //             name: item.name,
        //             price: item.price,
        //             count: item.count,
        //             img: item.img
        //         };
        //         return acc;
        //     }, {});
        // },
        clearCart: (state, action) => {
            state.entities = {};
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, decrement, increment, clearCart } = cartSlice.actions;

export default cartSlice.reducer;