import {StyleSheet, View} from 'react-native';
import React from 'react';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import Navigation from './src/navigation';
const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
