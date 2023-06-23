import { createSlice } from '@reduxjs/toolkit';
import { IOrderItem } from 'common/types';

const initialState = {
	products: [] as IOrderItem[],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
