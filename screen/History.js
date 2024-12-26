import React, { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM, API_URL_BOOKING } from '@env';
import axios from 'axios';

const History = ({ navigation }) => {
  const user_id = useSelector((state) => state.auth.user_id);

  const [booking, setBooking] = useState([]);
  const [nameHotel, setHotelNames] = useState({});
  const [imgHotel, setImgHotel] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responsive = await axios.get(API_URL + API_URL_BOOKING + "search/" + user_id);
        const bookingData = responsive.data;
        setBooking(bookingData);

        // Nếu không có booking, thoát sớm
        if (bookingData.length === 0) return;

        // Lấy danh sách id_user, id_hotel, id_room từ booking
        const hotelIds = [...new Set(bookingData.map((booking) => booking.id_hotel))];

        // Tạo Promise cho các API khách sạn
        const hotelFetchPromises = hotelIds.map((id_hotel) =>
          axios.get(API_URL + API_URL_HOTEL + id_hotel).then((res) => ({
            id_hotel,
            nameHotel: res.data.nameHotel,
            imageUrl: res.data.imageUrl,
          }))
        );

        const hotelResults = await Promise.all(hotelFetchPromises);

        // Tạo đối tượng hotelNameMap với cả tên khách sạn và ảnh
        const hotelNameMap = hotelResults.reduce((map, hotel) => {
          map[hotel.id_hotel] = hotel.nameHotel;
          return map;
        }, {});

        const hotelImageMap = hotelResults.reduce((map, hotel) => {
          map[hotel.id_hotel] = hotel.imageUrl;
          return map;
        }, {});

        setHotelNames(hotelNameMap);
        setImgHotel(hotelImageMap);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Đảm bảo rằng trạng thái loading được cập nhật thành false khi hoàn tất
      }
    };

    fetchData();
  }, [user_id]); // Chỉ gọi lại khi user_id thay đổi
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      {/* Header cố định */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.searchTitle}>History</Text>
        <View style={{ width: 24 }} />
      </View>




      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {booking && booking.length > 0 ? (
          booking.map((bookingItem, index) => (
            <Pressable key={bookingItem._id} onPress={() => navigation.goBack()}>
              <View style={styles.hotelCard}>
                <Image
                  style={styles.hotelImage}
                  source={{ uri: imgHotel[bookingItem.id_hotel] || 'default-image-url' }} // Thêm fallback URL nếu không có URL hợp lệ
                />

                <View style={styles.hotelInfo}>
                  <Text style={styles.hotelName}>
                    {nameHotel[bookingItem.id_hotel] || "Loading..."}
                  </Text>
                  <View style={styles.contentDetail}>
                    <Text style={styles.hotelDetail}>
                      Date booking: {formatDate(bookingItem.createdAt)}
                    </Text>
                    <Text style={styles.hotelDetail}>
                      Check in: {formatDate(bookingItem.check_in)}
                    </Text>
                    <Text style={styles.hotelDetail}>
                      Check out: {formatDate(bookingItem.check_out)}
                    </Text>
                    <Text style={styles.hotelDetail}>
                      Total cost: {formatDate(bookingItem.total_cost)}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noHotels}>No hotels available</Text>
        )}
      </ScrollView>

    </View>
  );
}

export default History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  searchBarWrapper: {
    marginTop: 20,
    width: '100%',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
  },
  searchTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchBarInputContainerStyle: {
    backgroundColor: '#e7e7e7',
    height: 50,
  },
  searchBarInputStyle: {
    paddingLeft: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 60,
  },
  headerHotelList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  hotelListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortButton: {
    alignSelf: 'flex-end',
  },
  sortButtonText: {
    color: '#13881A',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hotelCard: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
  },
  hotelImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  hotelInfo: {
    flex: 1,
    marginLeft: 10,

  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contentDetail:{
    marginTop:7,
  },
  hotelDetail: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 2,
  },
})