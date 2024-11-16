import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const SearchFilterScreen = () => {
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
        <Text style={styles.header}>Search Filter</Text>

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

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
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
        marginTop: 20,
    },
    resetButton: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        padding: 15,
        borderRadius: 8,
        marginRight: 5,
        alignItems: 'center',
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#0a8d48',
        padding: 15,
        borderRadius: 8,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SearchFilterScreen;
