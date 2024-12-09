import { View, Image, StyleSheet } from 'react-native';

const SliderItem = ({ item, hotelId }) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:item}} style={styles.image} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 450,
    height: 300,
    borderRadius: 10,
  },
});
