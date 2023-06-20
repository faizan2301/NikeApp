import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
