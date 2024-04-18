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
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../Redux/slice/apiSlice';
import {useStripe} from '@stripe/stripe-react-native';

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
  const {initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment} =
    useStripe();
  const DeliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createOrder, {error, isLoading}] = useCreateOrderMutation();
  const [checkout, {error: checkoutError, isLoading: checkoutLoading}] =
    useCreatePaymentIntentMutation();
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
  const onCheckout = async () => {
    if (subTotal <= 0) {
      return;
    }
    // 1. Create a payment intent
    var response = await checkout({amount: Math.floor(total * 100)});
    console.log(response);
    if (response?.error) {
      Alert.alert('Something went wrong');
      return;
    }

    // 2. Initialize the Payment sheet
    console.log('paymentIntent', response?.data);
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'EMF',
      customerId: response?.data?.customer,
      customerEphemeralKeySecret: response?.data?.ephemeralKey,
      paymentIntentClientSecret: response?.data?.paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    // 3. Present the Payment Sheet from Stripe
    var presentPaymentSheetError = await presentPaymentSheet();
    console.log('Error ', presentPaymentSheetError?.error);
    const {error: stripeError} = await confirmPaymentSheetPayment();
    console.log(
      'stripeError',
      `Error: ${stripeError.code} ${stripeError.message} `,
    );
    console.log(`Error stripeError ${JSON.stringify(stripeError)}`);

    if (initResponse.error) {
      console.log('initResponse er', initResponse?.error?.message);
      Alert.alert('Something went wrong');
      return;
    }
    // 4. If payment ok -> create the order
    // onCreateOrder();
  };
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotal}
      />
      <Pressable onPress={onCheckout} style={styles.buttonStyle}>
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
