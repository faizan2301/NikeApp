import {StyleSheet, Image, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import products from '../data/products';

const ProductScreen = props => {
  const {navigation} = props;

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ProductDetails')}>
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
