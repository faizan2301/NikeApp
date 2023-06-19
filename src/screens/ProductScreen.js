import {StyleSheet, Image, View, FlatList} from 'react-native';
import React from 'react';
import products from '../data/products';

const ProductScreen = () => {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Image style={styles.imageStyle} source={{uri: item.image}} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: '50%',
    aspectRatio: 1,
    margin: 1,
  },
});
