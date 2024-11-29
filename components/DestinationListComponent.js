import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL, API_URL_CITY, API_URL_HOTEL } from '@env';
import axios from 'axios';

const DestinationListComponent = () => {
  const [dataCity, setDataCity] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API thành phố
        const resCity = await axios.get(API_URL + API_URL_CITY);
        const cityData = resCity.data; // Lưu dữ liệu thành phố vào biến cityData

        // Lấy số lượng khách sạn cho mỗi thành phố
        const updatedCityData = await Promise.all(
          cityData.map(async (city) => {
            // Gửi yêu cầu API khách sạn cho từng thành phố
            const resHotel = await axios.get(API_URL + API_URL_HOTEL + 'search/' + city._id);
            const numberOfHotels = resHotel.data.length; // Số khách sạn trong thành phố

            // Trả về thành phố với số lượng khách sạn cập nhật
            return {
              ...city,
              hotels: `${numberOfHotels} Hotels`, // Cập nhật số lượng khách sạn
            };
          })
        );

        // Cập nhật state với dữ liệu thành phố đã được cập nhật
        setDataCity(updatedCityData);

      } catch (error) {
        console.log(error); 
      }
    };

    fetchData(); 
  }, []); 

  const renderDestinationItem = ({ item }) => (
    <View style={styles.destinationItem}>
      {/* Hiển thị hình ảnh thành phố */}
      <Image
        source={{ uri: item.img }} 
        style={styles.destinationImage}
      />
      <View style={styles.textContainer}>
        {/* Hiển thị tên thành phố */}
        <Text style={styles.destinationName}>{item.name}</Text>
        {/* Hiển thị số lượng khách sạn */}
        <Text style={styles.destinationHotels}>{item.hotels}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wannaGo}>
      <Text style={styles.recentText}>Where do you wanna go?</Text>
      <FlatList
        data={dataCity} // Dùng dữ liệu từ API đã cập nhật
        renderItem={renderDestinationItem}
        keyExtractor={(item) => item._id.toString()} // Đảm bảo id là chuỗi
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
