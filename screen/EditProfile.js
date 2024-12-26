import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../style/Colors';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL, API_URL_USER } from '@env';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({ navigation }) => {
  const user_id = useSelector((state) => state.auth.user_id);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [errorPhone, setPhoneError] = useState("")

  const [selectedGender, setSelectedGender] = useState('Male/Female');

  const [dateOfBirth, setDateOfBirth] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")
  const [username, setUsername] = useState("")
  const [address, setAddress] = useState("")

  const maxDate = new Date();

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
};
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    // Hàm async để lấy dữ liệu người dùng
    const fetchUserData = async () => {
      try {
        console.log(API_URL + API_URL_USER + user_id)
        const response = await axios.get(API_URL + API_URL_USER + user_id);
        setUserData(response.data);
        setUsername(response.data.username);
        setPhoneNumber(response.data.phoneNumber);
        setAddress(response.data.address);
        setSelectedGender(response.data.gender);
        setDateOfBirth(formatDate(response.data.dob));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchUserData();
  }, [user_id]);


  // Hiển thị màn hình tải trong khi chờ dữ liệu
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate))
      }

    } else {
      toggleDatepicker();
    }
  };


  const Update = async () => {
    if(!validatePhoneNumber(phoneNumber)){
      setPhoneError("The phone number must be 10 digits long.")
      return;
    }
    let form = {
      username: username,
      gender: selectedGender,
      address: address,
      dob: date,
      phoneNumber: phoneNumber,
    };

    axios.patch(API_URL + API_URL_USER + user_id, form)
      .then((response) => {
        if (response.data) {
          Alert.alert("Update information successful!");
        }
      })
      .catch((error) => {
        console.log(error);

        Alert.alert("An error occurred during registration.");
      });
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}  // Tăng thêm chiều cao cuộn khi bàn phím mở
      enableOnAndroid={true}  // Đảm bảo hoạt động tốt trên Android
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Ionicons name='chevron-back' size={30} color={'black'} style={styles.Img_back} />
        </Pressable>
        <Text style={styles.titleHeader}>Edit Profile</Text>
        <Pressable onPress={() => Update()}>
          <MaterialIcons name='save-as' size={34} color={'black'} style={styles.Img_save} />
        </Pressable>

      </View>

      <View style={styles.ViewImg}>
        <Image source={require('../img/avt.jpg')} style={styles.Img_user} />
        {/* <View style={styles.iconContainer}>
          <Entypo name='camera' size={30} color={'white'} style={styles.Img_camera} />
        </View> */}
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Email</Text>
          <View style={styles.contentEmail}>
            <Text style={styles.TextEmail}>{userData?.email}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Username</Text>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor={COLORS.grey}
            style={styles.fill}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Date of birth</Text>

          {showPicker && (
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
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setPhoneError("");
              }}
             
            />
          </View>
          {errorPhone ? <Text style={styles.error}>{errorPhone}</Text> : null}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Address</Text>
          <TextInput
            placeholder="Enter your address"
            placeholderTextColor={COLORS.grey}
            style={styles.fill}
            value={address}
            onChangeText={setAddress}
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
    marginTop: windowHeight * 0.015,
    marginBottom: windowWidth * 0.03,
  },
  titleHeader: {
    fontSize: 25,
    color: COLORS.black,
    marginTop: windowHeight * 0.014,
    marginLeft: windowWidth * 0.1,
    flex: 0.95
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
    color: COLORS.black,
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
  error: {
    color: 'red',
    fontSize:14,
    top: windowHeight * 0.01
  },
});

export default EditProfile;
