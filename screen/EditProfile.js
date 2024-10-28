import React, { useState } from 'react';
import {  Text, 
          TextInput, 
          View, 
          StyleSheet, 
          Image,
          Pressable, 
          Dimensions,
          Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../style/Colors';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native-gesture-handler';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState('Male/Female');
  
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const maxDate = new Date();

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({type}, selectedDate) => {
    if(type=="set"){
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === 'android'){
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate))
      }

    }else{
      toggleDatepicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;

  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}  // Tăng thêm chiều cao cuộn khi bàn phím mở
      enableOnAndroid={true}  // Đảm bảo hoạt động tốt trên Android
    >
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate("Profile")}>
          <Image source={require('../img/back.png')} style={styles.Img_back} />
        </Pressable>
        <Text style={styles.titleHeader}>Edit Profile</Text>
        <Image source={require('../img/diskette.png')} style={styles.Img_save} />
      </View>

      <View style={styles.ViewImg}>
        <Image source={require('../img/avt.jpg')} style={styles.Img_user} />
        <View style={styles.iconContainer}>
          <Image source={require('../img/camera.png')} style={styles.Img_camera} />
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Email</Text>
          <View style={styles.contentEmail}>
            <Text style={styles.TextEmail}>username@gmail.com</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Username</Text>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor={COLORS.grey}
            keyboardType="email-address"
            style={styles.fill}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Date of birth</Text>

          {showPicker&& (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onChange}
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
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                style={styles.fill}
                editable={false}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.wrapper}>
            <Text style={styles.contentText}>Gender</Text>
            {['Male', 'Female'].map((gender) => (
              <View key={gender} style={styles.mood}>
                <Pressable
                  style={styles.optionButton}
                  onPress={() => setSelectedGender(gender)}
                >
                  {selectedGender === gender && <View style={styles.selectedOption} />}
                </Pressable>
                <Text style={styles.feeling}>{gender}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Phone Number</Text>
          <View style={styles.ViewPhone}>
            <TextInput
              placeholder="+84"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.phoneCode}
            />
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.phoneNumber}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Address</Text>
          <TextInput
            placeholder="Enter your address"
            placeholderTextColor={COLORS.grey}
            keyboardType="email-address"
            style={styles.fill}
          />
        </View>
      </View>
      
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  Img_back: {
    width: 25,
    height: 25,
    opacity: 0.5,
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.02,
    marginBottom: windowWidth * 0.03,
  },
  Img_save: {
    width: 25,
    height: 25,
    marginTop: windowHeight * 0.02,
    marginBottom: windowWidth * 0.03,
  },
  titleHeader: {
    fontSize: 25,
    color: COLORS.black,
    marginTop: windowHeight * 0.014,
    marginLeft: windowWidth * 0.1,
    flex:0.95
  },
  ViewImg: {
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
  },
  Img_user: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
  },
  Img_camera: {
    tintColor: COLORS.white,
    width: 35,
    height: 35,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: COLORS.black,
    borderRadius: 100,
    top: windowHeight * 0.13,
    left: windowWidth * 0.55,
    padding: 10,
  },
  main: {
    padding: 10,
    marginTop: windowHeight * 0.02,
  },
  content: {
    margin: 8,
  },
  contentText: {
    fontSize: 20,
    color: COLORS.black,
    marginBottom: windowHeight * 0.01,
    fontWeight: 'bold',
  },
  fill: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    paddingVertical: windowHeight * 0.01,
    color:COLORS.black,
  },
  contentEmail: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    padding: windowHeight * 0.01,
    borderRadius: 12,
  },
  TextEmail: {
    color: COLORS.black,
    fontSize: 16,
  },
  ViewPhone: {
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  phoneCode: {
    width: '15%',
    borderRightWidth: 1,
    borderColor: COLORS.grey,
    height: '100%',
  },
  phoneNumber: {
    width: '80%',
    color: COLORS.black,
  },
  wrapper: {
    flexDirection: 'row',
  },
  mood: {
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  feeling: {
    fontSize: 18,
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  optionButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.gray,
    marginRight: windowWidth * 0.03,
    marginLeft: windowWidth * 0.03,
  },
  selectedOption: {
    width: 13,
    height: 13,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
  },
  
});

export default EditProfile;
