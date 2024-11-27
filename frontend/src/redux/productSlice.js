import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        buyproduct : null,
    },
    reducers: {
        setBuyProduct : (state, action) => {
            state.buyproduct = action.payload;
        }
    }
})

export const { setBuyProduct } = productSlice.actions;
export default productSlice.reducer;