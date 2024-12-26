import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM } from '@env';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../style/Colors';
const { width } = Dimensions.get('window');
import BookingRoom from '../components/BookingRoom';

const RoomDetail = ({ route, navigation }) => {
  const { hotelId } = route.params;
  const [images, setImages] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [dataHotel, setDataHotel] = useState("");
  const [roomHotel, setRoomHotel] = useState([]);



  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  const fetchData = useCallback(async () => {
    try {
      const amenitiesList = [
        { id: 1, label: "Wi-Fi", icon: "wifi", color: "#d4f8c4" },
        { id: 2, label: "Gym", icon: "barbell-outline", color: "#c4e8f8" },
        { id: 3, label: "Restaurant", icon: "restaurant", color: "#f8ecc4" },
        { id: 4, label: "Parking", icon: "car-outline", color: "#e4d4f8" },
        { id: 5, label: "Swimming Pool", icon: "water-outline", color: "#c4f8f8" },
      ];
  
      const [resHotel, resRoom] = await Promise.all([
        axios.get(`${API_URL}${API_URL_HOTEL}${hotelId}`),
        axios.get(`${API_URL}${API_URL_ROOM}search/${hotelId}`),
      ]);
  
      const hotelData = resHotel.data;
      const roomData = resRoom.data;
  
      // Cập nhật state nếu dữ liệu khác
      if (hotelData && hotelData !== dataHotel) {
        setDataHotel(hotelData);
      }
  
      if (roomData && roomData !== roomHotel) {
        setRoomHotel(roomData);
      }
  
      const amenitiesFromDb = hotelData.amenities.split(",").map((amenity) => amenity.trim());
      const filtered = amenitiesList.filter((item) => amenitiesFromDb.includes(item.label));
  
      // So sánh mảng amenities
      const areArraysEqual =
        filtered.length === filteredAmenities.length &&
        filtered.every((item, index) => item.label === filteredAmenities[index]?.label);
  
      if (!areArraysEqual) {
        setFilteredAmenities(filtered);
      }
  
      const roomImages = roomData.flatMap((room) => room.roomImages || []);
      const combinedImages = [hotelData.imageUrl, ...roomImages].filter(
        (img) => img && typeof img === "string" && img.startsWith("http")
      );
  
      if (JSON.stringify(combinedImages) !== JSON.stringify(images)) {
        setImages(combinedImages);
      }
  
      const prices = roomData.map((room) => room.price_per_night);
      const minPriceValue = Math.min(...prices);
      const maxPriceValue = Math.max(...prices);
  
      if (minPrice !== minPriceValue) {
        setMinPrice(minPriceValue);
      }
      if (maxPrice !== maxPriceValue) {
        setMaxPrice(maxPriceValue);
      }
      console.log('detail room');
    } catch (error) {
      console.error(error);
    }
  }, [hotelId]);  // Chỉ phụ thuộc vào hotelId
  
  useEffect(() => {
    fetchData();
  }, [hotelId]);  // Chỉ phụ thuộc vào hotelId
   // Chỉ phụ thuộc vào hotelId và fetchData
  
  

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Back and Favorite Buttons */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Hotel Details */}
        <Text style={styles.hotelName}>{dataHotel.nameHotel}</Text>
        {/* <Text style={styles.rating}>⭐ 4.5 (135 Reviews)</Text> */}
        <Text style={styles.address}>
          <Ionicons name="location-outline" size={18} />
          {dataHotel.address}
        </Text>

        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.description}>
          {dataHotel.description}
        </Text>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {filteredAmenities.length > 0 ? (
            <View style={styles.amenitiesList}>
              {filteredAmenities.map((amenity) => (
                <View key={amenity.id} style={[styles.amenityItem, { backgroundColor: amenity.color }]}>
                  <Ionicons name={amenity.icon} size={24} color="#333" />
                  <Text style={styles.label}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No amenities available</Text>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.buttonBooking}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {minPrice !== null && maxPrice !== null
              ? minPrice === maxPrice || maxPrice === null
                ? `${minPrice}$`
                : `${minPrice}-${maxPrice}$`
              : 'Đang tải...'}

          </Text>
          <Text style={styles.perNight}>/ night</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Select Rooms</Text>
        </TouchableOpacity>

        {modalVisible && (
          <BookingRoom
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
            hotelId={hotelId}
          />
        )}

        {/* <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Select Rooms</Text>
        </Pressable>
        <BookingRoomMemo modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  imageContainer: { height: 200, position: 'relative' },
  image: { width: width, height: '100%' },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: '#007BFF' },
  headerIcons: { position: 'absolute', top: 10, left: 10, right: 10, flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 50 },
  contentContainer: { padding: 15 },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rating: { fontSize: 14, color: '#888', marginVertical: 5 },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 40,
  },
  amenityItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures items wrap if they exceed screen width
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    marginTop: 5,
  },
  buttonBooking: {
    position: "absolute",
    height: 60,
    // padding: 10,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    // borderTopWidth: 1,
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: '40%'
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  perNight: {
    fontSize: 14,
    color: "#888",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#13881A", // Dark blue color
    height: 50,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 5,
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RoomDetail;
