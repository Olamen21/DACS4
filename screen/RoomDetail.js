import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Modal,
  TextInput,
  Platform,
  Pressable,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import slideDetail from '../components/slideDetail';
import SliderItem from '../components/SliderItem';

import Pagination from '../components/Pagination';
import COLORS from '../style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM } from '@env';
import axios from 'axios';
import BookingRoom from '../components/BookingRoom';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const amenitiesList = [
  { id: 1, label: "Wi-Fi", icon: "wifi", color: "#d4f8c4" },
  { id: 2, label: "Gym", icon: "barbell-outline", color: "#c4e8f8" },
  { id: 3, label: "Restaurant", icon: "restaurant", color: "#f8ecc4" },
  { id: 4, label: "Parking", icon: "car-outline", color: "#e4d4f8" },
  { id: 5, label: "Swimming Pool", icon: "water-outline", color: "#c4f8f8" },
];
// const images = [
//   require('../img/detail.jpg'),
//   require('../img/detail1.jpg'),
//   require('../img/detail2.jpg'),
//   require('../img/detail3.jpg'),
// ];

const RoomDetail = ({ route, navigation }) => {
  const { hotelId } = route.params;
  const [images, setImages] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [dataHotel, setDataHotel] = useState("");
  const [roomHotel, setRoomHotel] = useState("");

  const scrollX = useRef(new Animated.Value(0)).current;

  const fetchData = useCallback(async () => {
    try {
      const [resHotel, resRoom] = await Promise.all([
        axios.get(`${API_URL}${API_URL_HOTEL}${hotelId}`),
        axios.get(`${API_URL}${API_URL_ROOM}search/${hotelId}`),
      ]);

      const hotelData = resHotel.data;
      const roomData = resRoom.data;

      setDataHotel(hotelData);
      setRoomHotel(roomData);

      const amenitiesFromDb = hotelData.amenities.split(",").map((amenity) => amenity.trim());
      const filtered = amenitiesList.filter((item) => amenitiesFromDb.includes(item.label));
      setFilteredAmenities(filtered);

      const roomImages = roomData.flatMap((room) => room.roomImages || []);
      const combinedImages = [hotelData.imageUrl, ...roomImages].filter(
        (img) => img && typeof img === "string" && img.startsWith("http")
      );
      setImages(combinedImages);

      const prices = roomData.map((room) => room.price_per_night);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    } catch (error) {
      console.error(error);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const BackHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backIconContainer} onPress={BackHome}>
          <Image source={require("../img/back.png")} style={styles.Img_back} />
        </Pressable>
        <Pressable style={styles.heartIconContainer} onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../img/heart_red.png")} style={styles.Img_heart} />
        </Pressable>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={images}
          renderItem={({ item }) => <SliderItem item={item} />}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          pagingEnabled
          initialNumToRender={3}
          windowSize={5}
        />
        <Pagination data={images} scrollX={scrollX} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.nameHotel}>{dataHotel.nameHotel}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={18} />
            {dataHotel.address}
          </Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.detail}>Details</Text>
          <Text style={styles.contentDetails}>{dataHotel.description}</Text>
        </View>

        <Text style={styles.detail}>Amenities</Text>
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

      <View style={styles.buttonBooking}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {minPrice !== null ? `${minPrice} - ${maxPrice}$` : "Loading..."}
          </Text>
          <Text style={styles.perNight}>/ night</Text>
        </View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Select Rooms</Text>
        </Pressable>
        <BookingRoom modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </View>
  );
};

export default RoomDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: 'absolute',
    top: windowHeight * 0.02,
    width: '100%',
    zIndex: 1,
  },
  backIconContainer: {
    position: 'absolute',
    left: windowWidth * 0.04,
    top: 0,
    backgroundColor: 'rgba(242, 242, 242, 0.4)',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    right: windowWidth * 0.04,
    top: 0,
    backgroundColor: 'rgba(242, 242, 242, 0.4)',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img_back: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
  },
  Img_heart: {
    width: 25,
    height: 25,
  },

  flatListContainer: {
    flex: 0.6,
    left: 0,
    right: 0,
    top: -10,
  },
  FlatList: {
    flex: 1,
  },
  content: {
    flex: 0.5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    marginBottom: 50,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  nameHotel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,

  },
  location: {
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    marginBottom: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  contentDetails: {
    fontSize: 16,
  },
  toggleText: {
    color: '#007BFF',
    fontSize: 14,
    marginTop: 5,
  },
  amenitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  amenityItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
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

})
