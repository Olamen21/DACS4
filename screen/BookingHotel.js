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
    setIsLoading(true);
    console.log("press BookingNow");
    const start = Date.now();
  
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
    };
  
    try {
      // Gửi yêu cầu đặt phòng trước
      const bookingResponse = await axios.post(API_URL + API_URL_BOOKING, formData);
      if (!bookingResponse.data) throw new Error("Booking failed!");
  
      console.log("Booking successful!");
      Alert.alert("Booking successful!");
  
      // Sau đó cập nhật trạng thái phòng
      await axios.patch(API_URL + API_URL_ROOM, form, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })
        .then((responsive) => {
          if (responsive.data) {
            alert("Update room successful.");
          }
        }).catch((error) => {
          console.log(error);
          alert("An error occurred during registration.");
      });

  
      console.log("Room update successful!");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert(error.message || "An error occurred during booking.");
    } finally {
      setIsLoading(false);
      const end = Date.now();
      console.log(`bookingNow executed in ${end - start} ms`);
    }
  };
  


  useEffect(() => {
    const fetchData = async () => {
      const start = Date.now();
      try {
        setIsLoading(true);

        const [responseHotel, responseRoom] = await Promise.all([
          axios.get(`${API_URL}${API_URL_HOTEL}${hotelId}`),
          axios.get(`${API_URL}${API_URL_ROOM}searchNumberRoom/${roomNumber}`)
        ]);

        const end = Date.now();
        console.log(`API calls executed in ${end - start} ms`);

        // Cập nhật state
        setDataHotel(responseHotel.data);

        const roomData = responseRoom.data[0];
        setRoomHotel(roomData);
        setRoomId(roomData._id);

        const days = calculateDays(checkIn, checkOut);
        setTotalCost(days * roomData.price_per_night);
        console.log("Booking room");
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
        <Pressable onPress={() => navigation.goBack()}>
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
        style={[styles.payNowButton, isLoading && styles.payNowButtonDisabled]}
        onPress={() => !isLoading && bookingNow()} // Vô hiệu hóa khi đang xử lý
      >
        <Text style={styles.payNowText}>
          {isLoading ? "Processing..." : "Booking Now"}
        </Text>
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
