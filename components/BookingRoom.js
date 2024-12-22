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
import React, { useState, useRef, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingRoom = ({ modalVisible, setModalVisible }) => {

  // const [isFilterVisible, setFilterVisible] = React.useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date(2024, 11, 12));
  const [checkOutDate, setCheckOutDate] = useState(new Date(2024, 11, 14));
  const [guest, setGuest] = useState(2);
  const [room, setRoom] = useState(1);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const handleReset = () => {

    setCheckInDate(new Date(2024, 11, 12));
    setCheckOutDate(new Date(2024, 11, 14));
    setGuest(2);
    setRoom(1);

  };

  const handleApply = () => {
    // Xử lý logic khi người dùng nhấn nút "Apply"
    console.log('Filters Applied');
    setModalVisible(false)
  };

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
                  <FontAwesome name="calendar-check-o" size={17} />
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
                  <FontAwesome name="user-circle-o" size={17} />
                  <Picker
                    selectedValue={guest}
                    style={styles.picker}
                    onValueChange={(itemValue) => setGuest(itemValue)}
                  >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    <Picker.Item label="4" value={4} />
                  </Picker>
                </View>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.label}>Room</Text>
                <View style={styles.iconInputContainer}>
                  <FontAwesome name="bed" size={17} />
                  <Picker
                    selectedValue={room}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRoom(itemValue)}
                  >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    <Picker.Item label="4" value={4} />
                  </Picker>
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