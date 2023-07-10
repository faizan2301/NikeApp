/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {numberOfCartsItems} from './Redux/slice/cartSlice';
import TrackOrderScreen from './screens/TrackOrderScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const cartSize = useSelector(numberOfCartsItems);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({navigation}) => ({
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate('TrackOrder')}
                name="truck-delivery"
                size={22}
                color="gray"
                marginRight={20}
              />
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('ShoppingCart')}
                style={{flexDirection: 'row'}}>
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text
                  style={{color: 'black', marginLeft: 5, fontWeight: '500'}}>
                  {cartSize}
                </Text>
              </Pressable>
            ),

            presentation: 'containedModal',
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{presentation: 'containedModal'}}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCartScreen}
          options={({navigation}) => ({
            headerLeft: () => (
              <Pressable
                style={{marginHorizontal: 20}}
                onPress={() => {
                  navigation.pop();
                }}>
                <FontAwesome5 name="arrow-left" size={18} color="black" />
              </Pressable>
            ),
            presentation: 'containedModal',
          })}
        />
        <Stack.Screen
          name="TrackOrder"
          component={TrackOrderScreen}
          options={{presentation: 'containedModal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
