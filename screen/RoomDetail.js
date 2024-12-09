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
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useRef, useEffect } from 'react'
import slideDetail from '../components/slideDetail';
import SliderItem from '../components/SliderItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import Pagination from '../components/Pagination';
import COLORS from '../style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM } from '@env';
import axios from 'axios';

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
  const [index, setIndex] = useState(0);
  const [filteredAmenities, setFilteredAmenities] = useState([]);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const maxDate = new Date();
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;
  }
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChangeCheckIn = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setCheckIn(formatDate(currentDate))
      }

    } else {
      toggleDatepicker();
    }
  };
  const onChangeCheckOut = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setCheckOut(formatDate(currentDate))
      }

    } else {
      toggleDatepicker();
    }
  };
  // const [slideDetail, setSlideDetail] = useState('')
  const [dataHotel, setDataHotel] = useState('')
  const [roomHotel, setRoomHotel] = useState('')
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset:
            {
              x: scrollX,
            },
          },
        }
      ], {
      useNativeDriver: false,
    },
    )(event);
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }
  ).current;



  const BackHome = () => {
    console.log("Back")
    navigation.navigate("Home")
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin khách sạn
        const resHotel = await axios.get(API_URL + API_URL_HOTEL + hotelId);
        setDataHotel(resHotel.data);
        const hotelImage = resHotel.data.imageUrl || "default_hotel_image_url";

        // Chuyển đổi amenities
        const amenitiesFromDb = resHotel.data.amenities
          .split(',')
          .map((amenity) => amenity.trim());

        // Lọc amenitiesList dựa trên dữ liệu từ DB
        const filtered = amenitiesList.filter((item) =>
          amenitiesFromDb.includes(item.label)
        );
        setFilteredAmenities(filtered);

        const resRoom = await axios.get(`${API_URL}${API_URL_ROOM}search/${hotelId}`);
        const rooms = resRoom.data;
        setRoomHotel(rooms);
        const roomImages = resRoom.data
          .map((room) => room.roomImages || [])
          .flat();


        const combinedImages = [hotelImage, ...roomImages]
          .filter((img) => img && typeof img === "string" && img.startsWith("http"));
        console.log("Hotel Image:", hotelImage);
        console.log("Room Images:", roomImages);
        console.log("Combined Images:", combinedImages);



        // Lưu vào state
        setImages(combinedImages);

        // Tìm giá nhỏ nhất và lớn nhất
        const prices = rooms.map((room) => room.price_per_night);

        if (prices.length === 1 || Math.min(...prices) === Math.max(...prices)) {
          // Khi chỉ có một phòng hoặc min/max trùng nhau
          setMinPrice(Math.min(...prices));
          setMaxPrice(null); // Không cần set giá trị max
        } else {
          // Khi có nhiều phòng với các mức giá khác nhau
          setMinPrice(Math.min(...prices));
          setMaxPrice(Math.max(...prices));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [hotelId]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backIconContainer} onPress={() => BackHome()}>
          <Image source={require('../img/back.png')} style={styles.Img_back} />
        </Pressable>

        <Pressable style={styles.heartIconContainer} onPress={() => navigation.navigate("Profile")}>
          <Image source={require('../img/heart_red.png')} style={styles.Img_heart} />
        </Pressable>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={images}
          renderItem={({ item }) => <SliderItem item={item} hotelId={hotelId} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          style={styles.FlatList}
          keyExtractor={(item, index) => `${item}-${index}`} // Đảm bảo key là duy nhất
        />


        <Pagination data={slideDetail} scrollX={scrollX} index={index} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.nameHotel}>{dataHotel.nameHotel}</Text>
          <Text style={styles.location}>
            <Ionicons name='location-outline' size={18} />
            {dataHotel.address}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.detail}>Details</Text>
          <Text style={styles.contentDetails}>{dataHotel.description}</Text>

        </View>
        <Text style={styles.detail}>Amenities</Text>
        <View style={styles.amenitiesContainer}>

          {/* Amenities List */}
          {filteredAmenities.length > 0 ? (
            <View style={styles.amenitiesList}>
              {filteredAmenities.map((amenity) => (
                <View
                  key={amenity.id}
                  style={[styles.amenityItem, { backgroundColor: amenity.color }]}
                >
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
            {minPrice !== null && maxPrice !== null
              ? minPrice === maxPrice
                ? `${minPrice}$` // Khi min và max bằng nhau, chỉ hiển thị một giá trị
                : `${minPrice}-${maxPrice}$` // Khi min và max khác nhau, hiển thị khoảng giá
              : 'Đang tải...'} {/* Khi giá trị chưa sẵn sàng */}
          </Text>

          <Text style={styles.perNight}>/ night</Text>
        </View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Select Rooms</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.titleModal}>Booking Hotel</Text>

              {/* Input fields */}
              <View style={styles.dateContainer}>
                <View style={styles.dateCheckIn}>
                  <Text style={styles.contentText}>Check-in</Text>

                  {showPicker && (
                    <DateTimePicker
                      mode='date'
                      display='spinner'
                      value={date}
                      onChange={onChangeCheckIn}
                      maximumDate={new Date(maxDate)}
                    // minimumDate={new Date('2001-2-1')}
                    />
                  )}

                  {!showPicker && (
                    <Pressable
                      onPress={toggleDatepicker}
                    >
                      <TextInput
                        placeholder="Sat Aug 21 2004"
                        placeholderTextColor={COLORS.grey}
                        value={checkIn}
                        onChangeText={setCheckIn}
                        style={styles.fill}
                        editable={false}
                      />
                    </Pressable>
                  )}
                </View>
                <View style={styles.dateCheckOut}>
                  <Text style={styles.contentText}>Check-out</Text>

                  {showPicker && (
                    <DateTimePicker
                      mode='date'
                      display='spinner'
                      value={date}
                      onChange={onChangeCheckOut}
                      maximumDate={new Date(maxDate)}
                    // minimumDate={new Date('2001-2-1')}
                    />
                  )}

                  {!showPicker && (
                    <Pressable
                      onPress={toggleDatepicker}
                    >
                      <TextInput
                        placeholder="Sat Aug 21 2004"
                        placeholderTextColor={COLORS.grey}
                        value={checkOut}
                        onChangeText={setCheckOut}
                        style={styles.fill}
                        editable={false}
                      />
                    </Pressable>
                  )}
                </View>

              </View>

              <View style={styles.counterContainer}>
                <View style={styles.counter}>
                  <Text style={styles.contentText}>Guests</Text>
                  <View style={styles.counterControls}>
                    <Pressable
                      onPress={() => setGuests(Math.max(1, guests - 1))}
                      style={styles.counterButton}
                    >
                      <Text style={styles.counterButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.textGuests}>{guests}</Text>
                    <Pressable
                      onPress={() => setGuests(guests + 1)}
                      style={styles.counterButton}
                    >
                      <Text style={styles.counterButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.counter}>
                  <Text style={styles.contentText}>Rooms</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.selectedRoom}
                    placeholder="Select room"
                  />
                </View>
              </View>

              {/* Find button */}
              <Pressable style={styles.findButton} onPress={() => navigation.navigate("BookingHotel")}>
                <Text style={styles.findButtonText}>FIND</Text>
              </Pressable>

              {/* Close button */}
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  titleModal: {
    color: COLORS.black,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 26,
    fontWeight: 'bold'
  },

  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateCheckIn: {
    width: '50%'
  },

  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  counter: {
    alignItems: "center",
  },
  counterLabel: {
    marginBottom: 5,
  },
  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    // width:200,
  },
  textGuests: {
    width: 30,
    textAlign: 'center'

  },
  counterButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  findButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  findButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeText: {
    color: "#4CAF50",
    marginTop: 10,
  },
  fill: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    paddingVertical: windowHeight * 0.01,
    color: COLORS.black,
    // width:'50%'
  },
  contentText: {
    color: COLORS.black,
    fontSize: 20,
  },
  selectedRoom:{
    width:200,
  }
})
