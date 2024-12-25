import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL, API_URL_HOTEL, API_URL_ROOM, API_URL_USER, API_URL_BOOKING } from '@env';
import axios from 'axios';

const BookingHotel = ({ navigation, route }) => {
  const { hotelId, roomNumber, checkIn, checkOut, dateBooking } = route.params;
  const user_id = useSelector((state) => state.auth.user_id);

  const [dataHotel, setDataHotel] = useState('');
  const [roomHotel, setRoomHotel] = useState([]);
  const [roomId, setRoomId] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState('')


  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;
  }

  const calculateDays = (checkIn, checkOut) => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const bookingNow = async () => {
    console.log('press BookingNow');

    // Cập nhật trạng thái loading
    setIsLoading(true);

    let formData = {
      id_hotel: hotelId,
      id_user: user_id,
      id_room: roomId,
      check_in: checkIn,
      check_out: checkOut,
      total_cost: totalCost,
    };

    let form = {
      availability: false,
    }
    try {
      const response = await axios.post(API_URL + API_URL_BOOKING, formData);

      if (response.data) {
        console.log(API_URL + API_URL_ROOM + roomId)
        const updateResponse = await axios.patch(API_URL + API_URL_ROOM + roomId, form);

        if (updateResponse.data) {
          console.log("Update room successful!");
          Alert.alert("Booking successful!");
          navigation.navigate("Home");
        } else {
          throw new Error("Room update failed!");
        }
      } else {
        throw new Error("Booking failed!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message || "An error occurred during booking.");
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const responseHotel = await axios.get(`${API_URL}${API_URL_HOTEL}${hotelId}`);
        const responseRoom = await axios.get(`${API_URL}${API_URL_ROOM}searchNumberRoom/${roomNumber}`);

        setDataHotel(responseHotel.data);

        const roomData = responseRoom.data[0];
        setRoomHotel(roomData);
        setRoomId(roomData._id);

        const days = calculateDays(checkIn, checkOut);
        setTotalCost(days * roomData.price_per_night);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hotelId, roomNumber, checkIn, checkOut]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }



  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => navigation.navigate("RoomDetail", { hotelId: hotelId })}>
          <Ionicons name='chevron-back' size={30} color={'black'} style={styles.Img_back} />
        </Pressable>
        <Text style={styles.header}>Review Summary</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={dataHotel.imageUrl ? { uri: dataHotel.imageUrl } : require('../img/loading.jpg')}
          style={styles.image}
        />

        <View style={styles.cardDetails}>

          <Text style={styles.hotelName}>{dataHotel.nameHotel}</Text>
          <Text style={styles.hotelLocation}>{dataHotel.address}</Text>
          <Text style={styles.price}>$ {roomHotel.price_per_night}/night</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <TextRow label="Booking Date" value={formatDate(dateBooking)} />
        <TextRow label="Check In" value={formatDate(checkIn)} />
        <TextRow label="Check Out" value={formatDate(checkOut)} />
        <TextRow label="Guest" value={roomHotel.capacity} />
        <TextRow label="Total" value={`${totalCost}$`} />

      </View>
      <Pressable
        style={styles.payNowButton}
        onPress={() => bookingNow()}
        disabled={isLoading} // Vô hiệu hóa nút trong khi đang chờ phản hồi
      >
        <Text style={styles.payNowText}>Booking Now</Text>
      </Pressable>
    </View>
  );
};

const TextRow = ({ label, value }) => (
  <View style={styles.textRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardDetails: {
    marginLeft: 10,
    flex: 1,
  },


  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  hotelLocation: {
    color: 'gray',
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#13881A',
  },
  infoSection: {
    marginBottom: 20,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  changeText: {
    color: 'orange',
    fontSize: 14,
  },
  payNowButton: {
    backgroundColor: '#13881A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingHotel;
