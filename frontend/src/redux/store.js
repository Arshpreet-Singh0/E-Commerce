import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import cartSlice from "./cartSlice";
import CategorySlice from './CategorySlice'

const store = configureStore({
    reducer : {
        auth : authSlice,
        cart : cartSlice,
        category : CategorySlice
    }
})

export default store