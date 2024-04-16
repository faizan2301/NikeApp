import {createSlice} from '@reduxjs/toolkit';
import products from '../../data/products';
const initialState = {
  products: products,
  id: null,
  selectedProduct: null,
};
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find(p => p.id === productId);
    },
    setSelectedId: (state, action) => {
      const id = action.payload;
      state.id = id;
    },
  },
});
