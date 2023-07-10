const {configureStore} = require('@reduxjs/toolkit');
import {cartSlice} from './slice/cartSlice';
import {productSlice} from './slice/productSlice';
import {apiSlice} from './slice/apiSlice';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
