import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HotelInCity = ({ route, navigation }) => {
    const { cityId, numberOfHotels } = route.params;
    const [cityName, setCityName] = useState('')
    const [dataHotel, setDataHotel] = useState([]);
    const [roomPrices, setRoomPrices] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URL + API_URL_CITY + cityId)
                setCityName(res.data.name)
                // console.log(res.data)
                // console.log(API_URL + API_URL_HOTEL + "search/" + cityId)
                const responsive = await axios.get(API_URL + API_URL_HOTEL + "search/" + cityId)
                const hotels = responsive.data;
                setDataHotel(hotels);

                // Nếu không có khách sạn, thoát sớm
                if (hotels.length === 0) return;

                // Fetch room data for each hotel
                const roomDataPromises = hotels.map(hotel =>
                    axios.get(API_URL + API_URL_ROOM + "search/" + hotel._id)
                        .then(response => ({ hotelId: hotel._id, rooms: response.data }))
                        .catch(error => {
                            // console.error(`Error fetching rooms for hotel ${hotel._id}:`, error);
                            return { hotelId: hotel._id, rooms: [] }; // Trả về mảng rỗng nếu lỗi
                        })
                );

                // Wait for all room data requests to complete
                const roomResponses = await Promise.all(roomDataPromises);

                // Process room data to find min and max prices
                const roomPricesMap = {};
                roomResponses.forEach(({ hotelId, rooms }) => {
                    if (rooms.length > 0) {
                        const prices = rooms.map(room => room.price_per_night);
                        roomPricesMap[hotelId] = {
                            minPrice: Math.min(...prices),
                            maxPrice: Math.max(...prices),
                        };
                    } else {
                        roomPricesMap[hotelId] = null; // Không có phòng nào
                    }
                });

                setRoomPrices(roomPricesMap);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    })
    return (
        <View style={styles.container}>
            {/* Header cố định */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.searchTitle}>Hotel in {cityName} </Text>
                <View style={{ width: 24 }} />
            </View>



            <View style={styles.headerHotelList}>
                <Text style={styles.hotelListTitle}>Hotel Lists ({numberOfHotels})</Text>
            </View>
            {/* Nội dung có thể cuộn (Danh sách khách sạn) */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {dataHotel && dataHotel.length > 0 ? (
                    dataHotel.map((hotel, index) => (
                        <Pressable key={hotel._id} onPress={() => navigation.navigate('RoomDetail', { hotelId: hotel._id})}>
                            <View key={index} style={styles.hotelCard}>
                                <Image
                                    style={styles.hotelImage}
                                    source={{ uri: hotel.imageUrl }} // Sử dụng hình ảnh động từ API
                                />
                                <View style={styles.hotelInfo}>
                                    <Text style={styles.hotelName}>{hotel.nameHotel}</Text>
                                    <Text style={styles.hotelAddress}>
                                        <Ionicons name='location-outline' size={16} />
                                        {hotel.address}
                                    </Text>
                                    <View style={styles.hotelDetails}>
                                        {/* <Text style={styles.hotelDistance}>{hotel._id}</Text> */}
                                        {/* <Text style={styles.hotelRating}>⭐ {hotel.rating} ({hotel.reviewsCount})</Text> */}
                                    </View>

                                    {roomPrices[hotel._id] ? (

                                        roomPrices[hotel._id].minPrice === roomPrices[hotel._id].maxPrice ? (
                                            // Display a single price if only one room or all rooms have the same price
                                            <Text style={styles.hotelPrice}>
                                                ${roomPrices[hotel._id].minPrice} /night
                                            </Text>
                                        ) : (
                                            // Display the price range if multiple rooms with different prices
                                            <Text style={styles.hotelPrice}>
                                                ${roomPrices[hotel._id].minPrice} - ${roomPrices[hotel._id].maxPrice} /night
                                            </Text>
                                        )
                                    ) : (
                                        <Text style={styles.noRooms}>No rooms available</Text>
                                    )}

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

export default HotelInCity

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
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    hotelAddress: {
        fontSize: 14,
        color: 'grey',
        marginVertical: 5,
    },
    hotelDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    hotelDistance: {
        fontSize: 12,
        color: 'grey',
        marginRight: 10,
    },
    hotelRating: {
        fontSize: 12,
        color: 'grey',
    },
    hotelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#13881A',
    },
    filterButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#13881A',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        zIndex: 1,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    iconInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 16,
        marginLeft: 8,
    },
    row: {
        flexDirection: 'row',
    },
    rowItem: {
        flex: 1,
        marginRight: 5,
    },
    dateInput: {
        marginLeft: 5,
    },
    picker: {
        flex: 1,
        marginLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    resetButtonText: {
        color: '#333',
    },
    applyButton: {
        backgroundColor: '#13881A',
        padding: 10,
        borderRadius: 5,
    },
    applyButtonText: {
        color: '#fff',
    },
})