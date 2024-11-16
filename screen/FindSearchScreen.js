import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const FindSearchScreen = ({ route, navigation}) => {

    const { searchQuery } = route.params;
    const [isFilterVisible, setFilterVisible] = React.useState(false);
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState(new Date(2024, 11, 12));
    const [checkOutDate, setCheckOutDate] = useState(new Date(2024, 11, 14));
    const [guest, setGuest] = useState(2);
    const [room, setRoom] = useState(1);
    const [priceMin, setPriceMin] = useState(100);
    const [priceMax, setPriceMax] = useState(250);
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

    const handleReset = () => {
        setDestination('');
        setCheckInDate(new Date(2024, 11, 12));
        setCheckOutDate(new Date(2024, 11, 14));
        setGuest(2);
        setRoom(1);
        setPriceMin(100);
        setPriceMax(250);
    };

    const handleApply = () => {
        // Xử lý logic khi người dùng nhấn nút "Apply"
        console.log('Filters Applied');
    };

    return (
        <View style={styles.container}>
            {/* Header cố định */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.searchTitle}>Search</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarWrapper}>
                <SearchBar
                    placeholder={`Hotel in ${searchQuery}`}
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.searchBarInputContainerStyle}
                    inputStyle={styles.searchBarInputStyle}
                    searchIcon={<Icon name="search" size={17} color="gray" />}
                />
                </View>
            </View>

            <View style={styles.headerHotelList}>
                <Text style={styles.hotelListTitle}>Hotel Lists (27)</Text>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortButtonText}>Sort by</Text>
                </TouchableOpacity>
            </View>
            {/* Nội dung có thể cuộn (Danh sách khách sạn) */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Hotel Item 1 */}
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>

                {/* Hotel Item 2 */}
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>

                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>
                <View style={styles.hotelCard}>
                <Image
                    style={styles.hotelImage}
                    source={require('../img/hotelHilton.jpg')}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Hilton Hotel</Text>
                    <Text style={styles.hotelAddress}>50 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng</Text>
                    <View style={styles.hotelDetails}>
                    <Text style={styles.hotelDistance}>3.29 km</Text>
                    <Text style={styles.hotelRating}>⭐ 4.2 (2,003)</Text>
                    </View>
                    <Text style={styles.hotelPrice}>$200 /night</Text>
                </View>
                </View>
            </ScrollView>

            {/* Filter Button cố định */}
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                <Text style={styles.filterButtonText}>Filters</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterVisible}
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Search Filter</Text>

                        <View>
                            <Text style={styles.label}>Destination</Text>
                            <View style={styles.iconInputContainer}>
                                <FontAwesome name="map-marker" size={17}/>
                                <TextInput
                                    style={styles.input}
                                    value={destination}
                                    onChangeText={setDestination}
                                    placeholder="Enter destination"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Check In</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="calendar-check-o" size={17}/>
                                    <TouchableOpacity style={styles.dateInput} onPress={() => setShowCheckInPicker(true)} activeOpacity={0.7}>
                                        <Text>{checkInDate.toDateString()}</Text>
                                    </TouchableOpacity>
                                    {showCheckInPicker && (
                                        <DateTimePicker
                                        value={checkInDate}
                                        mode="date"
                                        display="default"
                                        onChange={(event, date) => {
                                            setShowCheckInPicker(false);
                                            if (date) setCheckInDate(date);
                                        }}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Check Out</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="calendar-check-o" size={17}/>
                                    <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} activeOpacity={0.7}>
                                        <Text style={styles.dateInput}>{checkOutDate.toDateString()}</Text>
                                    </TouchableOpacity>
                                    {showCheckOutPicker && (
                                        <DateTimePicker
                                        value={checkOutDate}
                                        mode="date"
                                        display="default"
                                        onChange={(event, date) => {
                                            setShowCheckOutPicker(false);
                                            if (date) setCheckOutDate(date);
                                        }}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Guest</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="user-circle-o" size={17}/>
                                    <Picker
                                        selectedValue={guest}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setGuest(itemValue)}
                                    >
                                        <Picker.Item label="1"   value={1} />
                                        <Picker.Item label="2"   value={2} />
                                        <Picker.Item label="3"   value={3} />
                                        <Picker.Item label="4"   value={4} />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Room</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="bed" size={17}/>
                                    <Picker
                                        selectedValue={room}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setRoom(itemValue)}
                                    >
                                        <Picker.Item label="1"    value={1}   />
                                        <Picker.Item label="2"    value={2}   />
                                        <Picker.Item label="3"    value={3}   />
                                        <Picker.Item label="4"    value={4}   />
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Price Minimum</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="dollar" size={17}/>
                                    <TextInput
                                        style={styles.input}
                                        value={String(priceMin)}
                                        onChangeText={(text) => setPriceMin(Number(text))}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            <View style={styles.rowItem}>
                                <Text style={styles.label}>Price Maximum</Text>
                                <View style={styles.iconInputContainer}>
                                    <FontAwesome name="dollar" size={17}/>
                                    <TextInput
                                        style={styles.input}
                                        value={String(priceMax)}
                                        onChangeText={(text) => setPriceMax(Number(text))}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Các input khác: check-in, check-out, số khách, giá */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                                <Text style={styles.resetButtonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

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
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    hotelAddress: {
        fontSize: 12,
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
});

export default FindSearchScreen;
