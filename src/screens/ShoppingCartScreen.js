/* eslint-disable react/no-unstable-nested-components */
import {FlatList, View, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import cart from '../data/cart';
import CartListItem from '../components/CartListItem';

const shoppingCartTotal = () => (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text style={styles.textStyle}>Subtotal</Text>
      <Text style={styles.textStyle}>410,00 US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textStyle}>Delivery</Text>
      <Text style={styles.textStyle}>10,00 US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textBold}>Total</Text>
      <Text style={styles.textBold}>420,00 US$</Text>
    </View>
  </View>
);
const ShoppingCartScreen = () => {
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        ListFooterComponent={shoppingCartTotal}
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
