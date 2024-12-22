import {  StyleSheet,
    Text,
    View,
    Modal,
    Dimensions,
    TextInput,
    Platform,
    Pressable,
    } from 'react-native'
import COLORS from '../style/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useRef, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingRoom = ({modalVisible, setModalVisible}) => {
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
  const bookingRoom = () =>{
    
    console.log(checkIn)
    console.log(checkOut)
  }
    return (
        <View>
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
                                        // maximumDate={new Date(maxDate)}
                                        minimumDate={new Date(maxDate)}
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
                                        // maximumDate={new Date(maxDate)}
                                        minimumDate={new Date(maxDate)}
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
                        <Pressable style={styles.findButton} onPress={() => bookingRoom()}>
                            <Text style={styles.findButtonText}>Booking</Text>
                        </Pressable>

                        {/* Close button */}
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default BookingRoom

const styles = StyleSheet.create({
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
      selectedRoom: {
        width: 200,
      }
})