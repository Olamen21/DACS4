import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Picker } from '@react-native-picker/picker';
import { API_URL, API_URL_CITY, API_URL_HOTEL, API_URL_ROOM } from '@env';
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingRoom = ({ modalVisible, setModalVisible, navigation, hotelId }) => {
  // const [isFilterVisible, setFilterVisible] = React.useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date(2024, 11, 12));
  const [checkOutDate, setCheckOutDate] = useState(new Date(2024, 11, 14));
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [room, setRoom] = useState(null); // To store the selected room number
  const [capacity, setCapacity] = useState('N/A');
  const [price, setPrice] = useState('N/A')

  const [dataHotel, setDataHotel] = useState('')
  const [roomHotel, setRoomHotel] = useState([]);
  const [date, setDate] = useState(new Date())
  const dateBooking = new Date()
  const [isLoading, setIsLoading] = useState(false);

    // Cải tiến việc mở DateTimePicker để tránh delay
    const handleCheckInDateChange = (event, date) => {
      setShowCheckInPicker(false);
      if (date) {
        setCheckInDate(date);
      }
    };
  
    const handleCheckOutDateChange = (event, date) => {
      setShowCheckOutPicker(false);
      if (date) {
        setCheckOutDate(date);
      }
    };

  const handleClose = () => {
    setModalVisible(false)
  };

  const handleApply = () => {
    setIsLoading(true);
    navigation.navigate('BookingHotel', {
      hotelId: hotelId,
      roomNumber: room,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      dateBooking: dateBooking.toISOString(),
    });
    setIsLoading(false); // Có thể loại bỏ nếu việc chuyển trang nhanh
  };


  const handleRoomChange = (selectedRoom) => {
    setRoom(selectedRoom);

    const selectedRoomDetails = roomHotel.find(
      (roomItem) => roomItem.room_number === selectedRoom
    );

    setCapacity(selectedRoomDetails?.capacity?.toString() || 'N/A');
    setPrice(selectedRoomDetails?.price_per_night?.toString() || 'N/A')
  };

  const fetchData = useCallback(async () => {
    try {
      const [resHotel, resRoom] = await Promise.all([
        axios.get(`${API_URL}${API_URL_HOTEL}${hotelId}`),
        axios.get(`${API_URL}${API_URL_ROOM}search/${hotelId}`),
      ]);

      const hotelData = resHotel.data;
      const roomData = resRoom.data;

      // Only update state if data has changed
      if (hotelData !== dataHotel) {
        setDataHotel(hotelData);
      }

      if (roomData !== roomHotel) {
        setRoomHotel(roomData);
      }
      console.log('Modal')
    } catch (error) {
      console.error(error);
    }
  }, [hotelId]);


  useEffect(() => {
    fetchData();
  }, [hotelId]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Filter</Text>



            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Check In</Text>
                <View style={styles.iconInputContainer}>
                  <FontAwesome name="calendar-check-o" size={17} />
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowCheckInPicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text>{checkInDate.toDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckInPicker && (
                    <DateTimePicker
                      value={checkInDate}
                      mode="date"
                      display="default"
                      onChange={handleCheckInDateChange}
                    />
                  )}
                </View>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.label}>Check Out</Text>
                <View style={styles.iconInputContainer}>
                  <FontAwesome name="calendar-check-o" size={17} />
                  <TouchableOpacity
                    onPress={() => setShowCheckOutPicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dateInput}>{checkOutDate.toDateString()}</Text>
                  </TouchableOpacity>
                  {showCheckOutPicker && (
                    <DateTimePicker
                      value={checkOutDate}
                      mode="date"
                      display="default"
                      onChange={handleCheckOutDateChange}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={styles.row}>
              {/* Room Picker */}
              <View style={styles.rowItem}>
                <Text style={styles.label}>Room</Text>
                <View style={styles.iconInputContainer}>
                  <FontAwesome name="bed" size={17} />
                  <Picker
                    selectedValue={room}
                    style={styles.picker}
                    onValueChange={handleRoomChange}
                  >
                    {roomHotel &&
                      Array.isArray(roomHotel) &&
                      roomHotel
                        .filter((roomItem) => roomItem.availability)
                        .map((roomItem) => (
                          <Picker.Item
                            key={roomItem._id}
                            label={`${roomItem.room_number}`}
                            value={roomItem.room_number}
                          />
                        ))}
                    {!roomHotel || roomHotel.length === 0 ? (
                      <Picker.Item label="Loading..." value={null} />
                    ) : null}
                  </Picker>
                </View>
              </View>

              {/* Guest Display */}
              <View style={styles.rowItem}>
                <Text style={styles.label}>Guest</Text>
                <View style={styles.iconInputContainer}>
                  <View style={styles.inputGuest}>
                    <FontAwesome name="user-circle-o" size={17} />
                    <Text style={styles.guestDisplay}>{capacity || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Price</Text>
                <View style={styles.iconInputContainer}>
                  <View style={styles.inputGuest}>
                    <FontAwesome name="user-circle-o" size={17} />
                    <Text style={styles.guestDisplay}>{price || 'N/A'} $ /Night</Text>
                  </View>
                </View>
              </View>
            </View>


            {/* Các input khác: check-in, check-out, số khách, giá */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClose} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApply}
                style={[styles.applyButton, isLoading && { opacity: 0.5 }]}
                disabled={isLoading}
              >
                <Text style={styles.applyButtonText}>
                  {isLoading ? 'Loading...' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default BookingRoom

const styles = StyleSheet.create({

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
  inputGuest: {
    flexDirection: 'row',
    paddingVertical: 15,
    fontSize: 16,
    marginLeft: 8,
  },
  guestDisplay: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
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