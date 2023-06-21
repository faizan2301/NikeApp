import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Pressable, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {numberOfCartsItems} from './Redux/slice/cartSlice';
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
          options={{presentation: 'containedModal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
