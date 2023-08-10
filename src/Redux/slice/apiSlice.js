import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// const baseUrl = 'http://192.168.1.25:3000/';
const baseUrl = 'https://nikeappbackend.onrender.com/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: id => `products/${id}`,
    }),
    //orders
    createOrder: builder.mutation({
      query: newOrder => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    getOrderByRef: builder.query({
      query: ref => `orders/${ref}`,
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderByRefQuery,
} = apiSlice;
