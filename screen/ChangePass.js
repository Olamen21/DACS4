import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Pressable, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import COLORS from '../style/Colors';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { API_URL, API_URL_USER } from '@env'
import axios from 'axios';
import CryptoJS from 'crypto-js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePass = ({ navigation }) => {
  const user_id = useSelector((state) => state.auth.user_id);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);

  const [isPassOldShown, setIsPassOldShown] = useState(false);
  const [isPassNewShown, setIsPassNewShown] = useState(false);
  const [isPassNewAgainShown, setIsPassNewAgainShown] = useState(false);

  const [passOld, setPassOld] = useState("")
  const [passNew, setPassNew] = useState("")
  const [passNewAgain, setPassNewAgain] = useState("")

  const [errorPassOld, setPassOldError] = useState("")
  const [errorPassNew, setPassNewError] = useState("")
  const [errorPassNewAgain, setPassNewAgainError] = useState("")

  useEffect(() => {
    // Hàm async để lấy dữ liệu người dùng
    const fetchUserData = async () => {
      console.log(API_URL + API_URL_USER + user_id)
      try {
        const response = await axios.get(API_URL + API_URL_USER + user_id);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchUserData();
  }, [user_id]);
 if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const hashedPasswordOld = CryptoJS.SHA256(passOld).toString();
  const hashedPasswordNew = CryptoJS.SHA256(passNew).toString();
  const changePasss = async()=>{
    try {
      if(userData.password!=hashedPasswordOld){
        setPassOldError("Invalid password.")
        return
      }
      if(passNew.length<6){
        setPassNewError("The password is to weak.")
        return
      }
      if(passNew!=passNewAgain){
        setPassNewAgainError("Invalid password.")
        return
      }
      let formData = {
        password:hashedPasswordNew,
      }
      axios.patch(API_URL + API_URL_USER + user_id, formData)
      .then((response) => {
        if (response.data) {
          Alert.alert("Update password successful!");
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("An error occurred during registration.");
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}
      enableOnAndroid={true}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Ionicons name='chevron-back' size={30} color={'black'} style={styles.Img_back} />
        </Pressable>
        <Text style={styles.titleHeader}>Change Password</Text>

      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Old Password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassOldShown}
              value={passOld}
              onChangeText={(text) => {
                setPassOld(text),
                setPassOldError("")
              }}
              
              style={{
                width: "100%",
                color: COLORS.black
              }} />

            <TouchableOpacity
              onPress={() => setIsPassOldShown(!isPassOldShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >

              <Ionicons
                name={isPassOldShown ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />


            </TouchableOpacity>
          </View>
          {errorPassOld ? <Text style={styles.error}>{errorPassOld}</Text> : null}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>New Password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassNewShown}
              value={passNew}
              onChangeText={(text) => {
                setPassNew(text),
                setPassNewError("")
              }}
              
              style={{
                width: "100%",
                color: COLORS.black
              }} />

            <TouchableOpacity
              onPress={() => setIsPassNewShown(!isPassNewShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              <Ionicons
                name={isPassNewShown ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />

            </TouchableOpacity>
          </View>
          {errorPassNew ? <Text style={styles.error}>{errorPassNew}</Text> : null}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Confirm your new password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassNewAgainShown}
              value={passNewAgain}
              onChangeText={(text) => {
                setPassNewAgain(text),
                setPassNewAgainError("")
              }}
             
              style={{
                width: "100%",
                color: COLORS.black
              }} />

            <TouchableOpacity
              onPress={() => setIsPassNewAgainShown(!isPassNewAgainShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              <Ionicons
                name={isPassNewAgainShown ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />


            </TouchableOpacity>
          </View>
          {errorPassNewAgain ? <Text style={styles.error}>{errorPassNewAgain}</Text> : null}
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Cancel"
          // onPress={()=>SignUp()}
          style={{
            width: "48%",
          }}
        />
        <Button
          title="Save Change"
          filled
          onPress={()=>changePasss()}
          style={{
            width: "48%"
          }}
        />
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
    flex: 0.95
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
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  imgPass: {
    width: 27,
    height: 27,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: windowWidth * 0.03,
    paddingRight: windowWidth * 0.03
  },
  error: {
    color: 'red',
    fontSize:14,
    top: windowHeight * 0.01
  },
});

export default ChangePass;
