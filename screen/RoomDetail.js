import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Pressable,
  Image,
  Dimensions
} from 'react-native'
import React, { useState, useRef } from 'react'
import slideDetail from '../components/slideDetail';
import SliderItem from '../components/SliderItem';
import Pagination from '../components/Pagination';
import COLORS from '../style/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RoomDetail = ({ navigation }) => {
  const [index, setIndex] = useState(0);
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

<<<<<<< Updated upstream
=======


  const BackHome = () => {
    console.log("Back")
    navigation.navigate("Home")
  }

  const Booking = () =>{
    console.log(checkIn)
    console.log(checkOut)
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


>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backIconContainer} onPress={() => navigation.navigate("Profile")}>
          <Image source={require('../img/back.png')} style={styles.Img_back} />
        </Pressable>

        <Pressable style={styles.heartIconContainer} onPress={() => navigation.navigate("Profile")}>
          <Image source={require('../img/heart_red.png')} style={styles.Img_heart} />
        </Pressable>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={slideDetail}
          renderItem={({ item }) => <SliderItem item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment='center'
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          style={styles.FlatList}
        />
        <Pagination data={slideDetail} scrollX={scrollX} index={index} />
      </View>

      <View style={styles.content}>
        <Text style={styles.Title}>Keithston Hotel</Text>
        <Text style={styles.description}>Explore the world with amazing accommodation experiences - Book your hotel today!</Text>
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
    flex: 0.4,
  },
  FlatList: {
    flex: 1,
  },
  content: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 10,
  },
})
