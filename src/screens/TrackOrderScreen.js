import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useGetOrderByRefQuery} from '../Redux/slice/apiSlice';
const TrackOrderScreen = () => {
  const [ref, setRef] = useState('');

  const {data, isLoading, error} = useGetOrderByRefQuery(ref);

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
        placeholderTextColor="black"
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== 'OK' && (
        <Text style={styles.ouput}>Order not found</Text>
      )}
      {data?.status === 'OK' && (
        <Text style={styles.ouput}>Order: {JSON.stringify(data.data)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  ouput: {
    color: 'black',
    fontSize: 20,
  },
});

export default TrackOrderScreen;
