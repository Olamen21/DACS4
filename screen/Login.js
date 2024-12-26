import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Dimensions, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import COLORS from '../style/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, logout } from './store/authSlice';
import { API_URL, API_URL_USER } from '@env';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({navigation}) => {
  const [EMAIL, SETEMAIL] = useState('');
  const [PASSWORD, SETPASSWORD] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  
  
  const Login = async () => {
    if (EMAIL === "" || PASSWORD === "") {
        Alert.alert("Please fill in all the required information.");
        return;
    }

    try {
      console.log(API_URL+API_URL_USER)


        // Kiểm tra xem email đã tồn tại chưa
        const response = await axios.get(API_URL+API_URL_USER);
        
        // Tìm người dùng dựa trên email
        const user = response.data.find(user => user.email === EMAIL);
        
        if (!user) {
            setEmailError("Invalid email. Please enter it again.");
            return;
        }

        // Mã hóa mật khẩu người dùng nhập vào
        const hashedPassword = CryptoJS.SHA256(PASSWORD).toString();

        // Kiểm tra mật khẩu đã mã hóa
        if (user.password !== hashedPassword) {
            setPassError("Invalid password. Please enter it again.");
            return;
        }

        // Nếu cả email và mật khẩu đều đúng
        Alert.alert("Login successful.");
      // Giả sử response trả về { token: "your-jwt-token", user_id: "12345" }
        dispatch(setToken({ token: user.token, user_id: user._id }));

        navigation.navigate("AppStack");
    } catch (error) {
        console.log(error);
        Alert.alert("An error occurred while checking the email.");
        return;
    }
};
  
  
// const handleLogout = () => {
//   dispatch(logout());
// };
  
    return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.main}}>
      <View style={{flex: 1, marginHorizontal:22}}>

        {/* Ảnh background */}
        <View style={{marginVertical: 22}}>
          <Image 
            source={require("../img/login.png")}
            style={{
              height: 200,
              width: "100%",
            }}
            />
            <Text style={styles.TextLogin}>Login</Text>
        </View>


        {/* Nhập username */}
        <View style={{marginBottom: 12}}>
          <Text style={styles.Text}>Email</Text>
          <View style={styles.View}>
            <TextInput
              placeholder='Enter your email'
              placeholderTextColor={COLORS.black}
              value={EMAIL}
              onChangeText={(text) => {
                SETEMAIL(text);
                setEmailError(""); 
            }}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>
          </View>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>
        
        
        {/* Nhập password */}
        <View style={{marginBottom: 10}}>
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
              }}/>

              <TouchableOpacity
                onPress={()=> setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >

                {/* Ẩn password */}
                <Ionicons
                name={isPasswordShown ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />
                 
              </TouchableOpacity>
          </View>
          {passError ? <Text style={styles.error}>{passError}</Text> : null}
        </View>


       
        {/* buttonLogin */}
        <Button
          title="Login"
          onPress={()=> Login()}
          filled 
          style={{
            top: windowWidth*0.07
          }}
        />


        {/* Login với tài khoản gg, fb */}
        <View style={{flexDirection: 'row', alignItems:'center', marginVertical:20, top: windowWidth*0.03}}>
            <View
              style={styles.ViewFinal}
              />
                <Text style={{fontSize: 14, color: COLORS.black}}>Or Login with</Text>
                <View
                  style={{
                    flex:1,
                    height:1, 
                    backgroundColor: COLORS.grey,
                    marginHorizontal:10
                  }}/>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>


              {/* <TouchableOpacity
              // onPress={()=> onGoogleButtonPress()}
              style={styles.TouchGoogle}>
                <Image 
                  source={require('../img/google.png')}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight:8
                  }}
                  resizeMode='contain'
                  />
                  <Text style={{color: COLORS.black}}>Google</Text>
              </TouchableOpacity> */}
        </View>


        {/* Đăng ký */}
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          marginVertical: 22
        }}>
          <Text style={{fontSize:16, color: COLORS.black}}>Don't have an account? </Text>
          <Pressable
            onPress={()=> navigation.navigate("Signup")}
            >
              <Text style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6
              }}>Register</Text>
            </Pressable> 
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  TextLogin:{
    color: COLORS.black,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Text:{
    fontSize:16,
    fontWeight: 'bold',
    marginVertical: 2,
    color: COLORS.black,
    top: windowWidth*0.04,
  },
  View:{
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    top: windowWidth*0.05,
  },
  imgPass:{
    width:27,
    height:27,
  },
  TextCheck:{
    color: COLORS.black,
    fontSize: 15,
    marginLeft: 10,
    marginTop: 3
    },
  ViewFinal:{
    flex:1,
    height:1, 
    backgroundColor: COLORS.grey,
    marginHorizontal:10
  },
  TouchFace:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10
  },
  TouchGoogle:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10
  },
  TextSignUp:{
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6
  },
  error:{
    color: 'red',
    top: windowHeight*0.025
  }
})