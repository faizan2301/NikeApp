const {createSlice, createSelector} = require('@reduxjs/toolkit');
const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        item => item.product._id === newProduct._id,
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({product: newProduct, quantity: 1});
      }
    },
    changeQuantity: (state, action) => {
      const {productId, count} = action.payload;
      const cartItem = state.items.find(item => item.product._id === productId);
      if (cartItem) {
        cartItem.quantity += count;
      }
      if (cartItem.quantity <= 0) {
        state.items = state.items.filter(item => item !== cartItem);
      }
    },
    clearShoppingCart: state => {
      state.items = [];
    },
  },
});

export const numberOfCartsItems = state => state.cart.items.length;

export const selectSubtotal = state =>
  state.cart.items.reduce(
    (sub, cartItem) => sub + cartItem.product.price * cartItem.quantity,
    0,
  );
const cartSelector = state => state.cart;
export const selectDeliveryPrice = createSelector(
  selectSubtotal,
  cartSelector,
  (subTotal, cart) => (subTotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee),
);
export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subTotal, deliveryFee) => subTotal + deliveryFee,
);
