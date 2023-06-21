import {FlatList, View, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import CartListItem from '../components/CartListItem';
import {useSelector} from 'react-redux';
import {
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
} from '../Redux/slice/cartSlice';

const ShoppingCartTotal = () => {
  const subTotal = useSelector(selectSubtotal);
  const DeliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  console.log('total', total);
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

  return (
    <>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotal}
      />
      <Pressable style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Checkout</Text>
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
