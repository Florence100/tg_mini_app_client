import { createSlice } from '@reduxjs/toolkit';

// state = {
//     entities: {
//         1: {
//             id: 1,
//             name: 'Пирог',
//             count: 1,
//         },
//         ...
//     }
// }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { entities: {} },
    reducers: {
        add: (state, action) => {
            const productItem = action.payload;
            console.log(productItem)
            state.entities[productItem.id] = {
                id: productItem.id,
                name: productItem.name,
                count: 1
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
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, decrement, increment } = cartSlice.actions;

export default cartSlice.reducer;