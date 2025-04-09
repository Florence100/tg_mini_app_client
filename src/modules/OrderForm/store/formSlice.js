import { createSlice } from '@reduxjs/toolkit';

// state = {
//     delivery: 'pickup',
//     readyDate: '2025-03-26',
//     readyTime: '12:00-14:00',
//     address: '...'
// }

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        delivery: 'pickup',
        readyDate: '',
        readyTime: '',
        address: ''
    },
    reducers: {
        deliveryChange: (state, action) => {
            state.delivery = action.payload;
        },
        readyDateChange: (state, action) => {
            state.readyDate = action.payload
        },
        readyTimeChange: (state, action) => {
            state.readyTime = action.payload
        },
        addressChange: (state, action) => {
            state.address = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { 
    deliveryChange, 
    readyDateChange, 
    readyTimeChange, 
    addressChange 
} = formSlice.actions;

export default formSlice.reducer;