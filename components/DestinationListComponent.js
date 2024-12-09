// DestinationListComponent.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { API_URL, API_URL_CITY, API_URL_HOTEL } from '@env';
import axios from 'axios';

const DestinationListComponent = ({ navigation }) => { // Xóa 'city' prop vì không cần
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCity = await axios.get(API_URL + API_URL_CITY);
        const cityData = resCity.data;

        const updatedCityData = await Promise.all(
          cityData.map(async (city) => {
            const resHotel = await axios.get(API_URL + API_URL_HOTEL + 'search/' + city._id);
            const numberOfHotels = resHotel.data.length;

            return {
              ...city,
              hotels: `${numberOfHotels}`,
            };
          })
        );

        setDataCity(updatedCityData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Di chuyển Pressable vào trong renderDestinationItem
  const renderDestinationItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('HotelInCity', { cityId: item._id, numberOfHotels:item.hotels })}>
      <View style={styles.destinationItem}>
        <Image
          source={{ uri: item.img }}
          style={styles.destinationImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.destinationName}>{item.name}</Text>
          <Text style={styles.destinationHotels}>{item.hotels} Hotels</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wannaGo}>
      <Text style={styles.recentText}>Where do you wanna go?</Text>
      <FlatList
        data={dataCity}
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item._id.toString()}
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
    position: 'relative',
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
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  destinationHotels: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DestinationListComponent;
