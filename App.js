import {StyleSheet, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';
const App = () => {
  const publishKey =
    'pk_test_51P5lvjSEIi1cjAfKJk5iEQMeT0Sp1ucbOdKnIVjCPVQnKjN9051sfzzR5mWks2HRyRudjZdmvnwinGqE9oQEHfnD00dEaypIY9';
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishKey}>
        <Navigation />
      </StripeProvider>
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
