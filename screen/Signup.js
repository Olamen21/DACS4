

import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Dimensions, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import COLORS from '../style/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { api_default } from './api'
import { API_URL, API_URL_USER } from '@env'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Signup = ({ navigation }) => {
  const [USERNAME, SETUSERNAME] = useState("");
  const [EMAIL, SETEMAIL] = useState("");
  const [PASSWORD, SETPASSWORD] = useState("");

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  //validate email
  const [emailError, setEmailError] = useState('');
  //validate phone
  const [passError, setPassError] = useState('');



  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };


  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };


  const SignUp = async () => {

    if (USERNAME === "" || EMAIL === "" || PASSWORD === "") {
      Alert.alert("Please fill in all the required information.");
      return;
    }
    if (!isChecked) {
      Alert.alert("You must check the box to accept the terms before registering.");
      return;
    }
    if (!validateEmail(EMAIL)) {
      setEmailError("The email address is badly formatted.");
      return;
    }
    if (PASSWORD.length < 6) {
      setPassError("The password is too weak.");
      return;
    }

    try {
    

      const response = await axios.get(API_URL+API_URL_USER);

      const emailExists = response.data.some(user => user.email === EMAIL);
      if (emailExists) {
        setEmailError("The email address is already in use. Please use a different email.");
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("An error occurred while checking the email.");
      return;
    }


    const hashedPassword = CryptoJS.SHA256(PASSWORD).toString();

    let formData = {
      email: EMAIL,
      username: USERNAME,
      password: hashedPassword, 
    };

    axios.post(API_URL+API_URL_USER, formData)
      .then((response) => {
        if (response.data) {
          Alert.alert("Registration successful! Please log in to start.");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("An error occurred during registration.");
      });
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 20, top: windowWidth * 0.04 }}>
        <View >
          <Text style={styles.TextCreatAccount}>Create Account</Text>
          <Text style={styles.TextSlogan}>Keithston Hotel: Book with Ease, Stay in Style!</Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.Text}>Username</Text>
          <View style={styles.View}>
            <TextInput
              placeholder='Enter your user name'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              value={USERNAME}
              onChangeText={(text) => SETUSERNAME(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }} />
          </View>
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.Text}>Email address</Text>
          <View style={styles.View}>
            <TextInput placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              value={EMAIL}
              onChangeText={(text) => {
                SETEMAIL(text);
                setEmailError("");
              }}
              style={{
                width: "100%",
                color: COLORS.black
              }} />
          </View>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>


        <View style={{ marginBottom: 8 }}>
          <Text style={styles.Text}>Password</Text>
          <View style={styles.View}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              value={PASSWORD}
              onChangeText={(text) => {
                SETPASSWORD(text);
                setPassError("");
              }}
              style={{
                width: "100%",
                color: COLORS.black
              }} />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >

              <Ionicons
                name={isPasswordShown ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />

            </TouchableOpacity>
          </View>
          {passError ? <Text style={styles.error}>{passError}</Text> : null}
        </View>

        <View style={{
          flexDirection: "row",
          marginVertical: 6,
          top: windowWidth * 0.07
        }}>
          <TouchableOpacity
            onPress={() => handleCheckboxPress()}
          >
            {
              isChecked == true ? (
                <Image
                  style={styles.imgPass}
                  source={require('../img/checkbox.png')} />
              ) : (
                <Image
                  style={styles.imgPass}
                  source={require('../img/unchecked.png')} />
              )
            }
            {/* <Icon
              name={isChecked ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color={isChecked ? 'blue' : 'gray'}
            /> */}
          </TouchableOpacity>
          <Text style={styles.TextCheck}>I agree to the terms and conditions</Text>
        </View>

        <Button
          title="Sign Up"
          filled
          onPress={() => SignUp()}
          style={{
            marginTop: 18,
            marginBottom: 4,
            top: windowWidth * 0.05

          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, top: windowWidth * 0.03 }}>
          <View
            style={styles.ViewFinal}
          />
          <Text style={{ fontSize: 14, color: COLORS.black }}>Or Sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center', top: windowWidth * 0.005
        }}>


          <TouchableOpacity
            // onPress={()=> onGoogleButtonPress()}
            style={styles.TouchGoogle}>
            <Image
              source={require('../img/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />
            <Text style={{ color: COLORS.black }}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          marginVertical: 22,
          bottom: windowWidth * 0.02
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.TextLogin}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  TextCreatAccount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,

  },
  TextSlogan: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
    top: windowWidth * 0.025,
  },
  Text: {
    fontSize: 16,
    marginVertical: 2,
    color: COLORS.black,
    fontWeight: 'bold',
    top: windowWidth * 0.04,
  },
  View: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    top: windowWidth * 0.05,
  },
  TextPhone: {
    fontSize: 16,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: 'bold',
    top: windowWidth * 0.04,
  },
  ViewPhone: {
    width: "100%",
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextCheck: {
    color: COLORS.black,
    fontSize: 15,
    left: windowWidth * 0.03,
  },
  ViewFinal: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey, marginHorizontal: 10
  },
  TouchFace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10
  },
  TouchGoogle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10
  },
  TextLogin: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6
  },
  error: {
    color: 'red',
    top: windowHeight * 0.025
  },
  imgPass: {
    width: 27,
    height: 27,
  },
})