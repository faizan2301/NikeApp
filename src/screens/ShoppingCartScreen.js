import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import CartListItem from '../components/CartListItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
  cartSlice,
} from '../Redux/slice/cartSlice';
import {useCreateOrderMutation} from '../Redux/slice/apiSlice';

const ShoppingCartTotal = () => {
  const subTotal = useSelector(selectSubtotal);
  const DeliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>Subtotal</Text>
        <Text style={styles.textStyle}>{subTotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>Delivery</Text>
        <Text style={styles.textStyle}>{DeliveryPrice} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};
const ShoppingCartScreen = () => {
  const cart = useSelector(state => state.cart.items);
  const subTotal = useSelector(selectSubtotal);
  const DeliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createOrder, {error, isLoading}] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const onCreateOrder = async () => {
    var response = await createOrder({
      items: cart,
      subTotal: subTotal,
      delivery: DeliveryPrice,
      total: total,
      customer: {
        name: 'Mohd faizan ',
        address: 'home',
        email: 'faizan@test.com',
      },
    });
    console.log('Done', response.data);
    if (response.data.status === 'OK') {
      Alert.alert(
        'Order has been placed',
        `Your reference is: ${response.data.data.ref}`,
      );
      dispatch(cartSlice.actions.clearShoppingCart());
    }

    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotal}
      />
      <Pressable onPress={onCreateOrder} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size={22} color="white" animating={true} />
          ) : (
            'Checkout'
          )}
        </Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  textStyle: {
    color: 'gray',
    fontSize: 16,
  },
  textBold: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonStyle: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
export default ShoppingCartScreen;
