import {StyleSheet, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
