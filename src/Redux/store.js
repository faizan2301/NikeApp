const {configureStore} = require('@reduxjs/toolkit');
import {cartSlice} from './slice/cartSlice';
import {productSlice} from './slice/productSlice';

export const store = configureStore({
  reducer: {products: productSlice.reducer, cart: cartSlice.reducer},
});
