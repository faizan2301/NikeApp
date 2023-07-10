/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {cartSlice} from '../Redux/slice/cartSlice';
import {useGetProductQuery} from '../Redux/slice/apiSlice';
const ProductDetailsScreen = props => {
  const {navigation} = props;

  const {width} = useWindowDimensions();
  const productId = useSelector(state => state.products.id);

  const dispatch = useDispatch();
  const {data, isLoading, error} = useGetProductQuery(productId);
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
  const product = data.data;
  console.log(productId);
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({product}));
    navigation.navigate('ShoppingCart');
  };
  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          horizontal
          renderItem={({item}) => (
            <Image
              source={{uri: item}}
              style={{width: width, aspectRatio: 1}}
            />
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{padding: 20}}>
          {/* Title */}
          <Text style={styles.textStyle}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.priceStyle}>${product.price}</Text>
          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
        {/* Add to cart button */}

        {/* Navigation icon */}
      </ScrollView>
      <Pressable style={styles.buttonStyle} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
      <Pressable
        style={styles.icon}
        onPress={() => {
          navigation.pop();
        }}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  priceStyle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    color: 'black',
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  buttonStyle: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#000000AA',
    borderRadius: 50,
    padding: 5,
  },
});

export default ProductDetailsScreen;
