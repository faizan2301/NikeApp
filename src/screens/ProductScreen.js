import {StyleSheet, Image, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {productSlice} from '../Redux/slice/productSlice';

const ProductScreen = props => {
  const {navigation} = props;
  const products = useSelector(state => state.products.products);
  const dipatch = useDispatch();
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => {
              //update selected product
              dipatch(productSlice.actions.setSelectedProduct(item.id));
              navigation.navigate('ProductDetails');
            }}>
            <Image source={{uri: item.image}} style={styles.image} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
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
