import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cartItems : [],
    },
    reducers : {
        setCartItems : (state, action)=>{
        state.cartItems = action.payload;
        }
    }
});

export const {setCartItems} = cartSlice.actions;

export default cartSlice.reducer;