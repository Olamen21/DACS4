import React from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';

const destinations = [
  { id: '1', name: 'Đà Nẵng', image: require('../img/cauvang-1654247842-9403-1654247849.jpg'), hotels: '178 Hotels' },
  { id: '2', name: 'Hội An', image: require('../img/Hoi-An-VnExpress-5851-16488048-4863-2250-1654057244.jpg'), hotels: '165 Hotels' },
];

const DestinationListComponent = () => {
  const renderDestinationItem = ({ item }) => (
    <View style={styles.destinationItem}>
      <Image source={item.image} style={styles.destinationImage} />
      <View style={styles.textContainer}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationHotels}>{item.hotels}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wannaGo}>
      <Text style={styles.recentText}>Where do you wanna go?</Text>
      <FlatList
        data={destinations}
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.destinationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wannaGo: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  destinationList: {
    marginTop: 10,
  },
  destinationItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative', //Giữ các thành phần bên trong theo vị trí tương đối
  },
  destinationImage: {
    width: 161,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.75)', //Đổ bóng chữ để dễ đọc hơn
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  destinationHotels: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.75)', //Đổ bóng chữ để dễ đọc hơn
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
    color:'black'
  },
});

export default DestinationListComponent;
