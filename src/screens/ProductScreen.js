import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {productSlice} from '../Redux/slice/productSlice';
import {useGetProductsQuery} from '../Redux/slice/apiSlice';

const ProductScreen = props => {
  const {navigation} = props;
  // const products = useSelector(state => state.products.products);
  const {data, isLoading, error} = useGetProductsQuery();
  const dipatch = useDispatch();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error);
    return (
      <Text style={{color: 'red', fontSize: 20}}>
        Error fetching data {error.error}
      </Text>
    );
  }
  const products = data.data;
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => {
              //update selected product
              dipatch(productSlice.actions.setSelectedId(item._id));
              navigation.navigate('ProductDetails', {id: item._id});
            }}>
            <Image source={{uri: item.image}} style={styles.image} />
          </Pressable>
        )}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
