import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookingHotel = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Ionicons name='chevron-back' size={30} color={'black'} style={styles.Img_back} />
        </Pressable>
        <Text style={styles.header}>Review Summary</Text>
      </View>
      <View style={styles.card}>
        <Image
          // source={{ uri: '../img/detail.jpg' }}
          source={require('../img/detail.jpg')}// Replace with your image URL
          style={styles.image}
        />
        <View style={styles.cardDetails}>

          <Text style={styles.hotelName}>Golden valley</Text>
          <Text style={styles.hotelLocation}>New York, USA</Text>
          <Text style={styles.price}>$150 / Day</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <TextRow label="Booking Date" value="September 24, 2023 | 2:00 PM" />
        <TextRow label="Check In" value="November 10, 2023" />
        <TextRow label="Check Out" value="December 04, 2023" />
        <TextRow label="Guest" value="05 Person" />
        <TextRow label="Total" value="$200.00" />

      </View>
      <TouchableOpacity style={styles.payNowButton}>
        <Text style={styles.payNowText}>Booking Now</Text>
      </TouchableOpacity>
    </ScrollView>
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
