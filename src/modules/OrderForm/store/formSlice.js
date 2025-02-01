import { createSlice } from '@reduxjs/toolkit';

// state = {
//     delivery: 'pickup'
// }

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        delivery: 'pickup'
    },
    reducers: {
        deliveryChange: (state, action) => {
            state.delivery = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { deliveryChange } = formSlice.actions;

export default formSlice.reducer;