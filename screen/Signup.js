import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Dimensions, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import COLORS from '../style/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../components/Button'
// import { db,  collection, addDoc, getDocs, where, query, FIREBASE_AUTH, setDoc, doc, provider, signInWithPopup} from '../firebase/index'
// import { UserContext } from '../components/UserContext'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Signup = ({navigation}) => {
// const Signup = () => {
  // const { users, setUser } = useContext(UserContext);

  
  
  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     webClientId: '591794021020-efjk9hjfccq6m942e5mf4osn46los7to.apps.googleusercontent.com',
  //   });
  // },[])

  // const [USERNAME, SETUSERNAME]= useState("");
  // const [EMAIL, SETEMAIL] = useState("");
  // const [PHONE, SETPHONE] = useState("");
  // const [PASSWORD, SETPASSWORD] = useState("");

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked,setIsChecked] = useState(false);


  // //validate email
  // const [emailError, setEmailError] = useState('');
  // //validate phone
  // const [passError, setPassError] = useState('');
  // //validate username
  // const [usernameError, setUsernameError] = useState('');

  
  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };
 

  // const SignUp = async()=>{
  //   const authen = FIREBASE_AUTH;
  //   if(USERNAME=="" || EMAIL=="" || PASSWORD=="" ){
  //     Alert.alert("Please fill in all the required information.");
  //     return;
  //   }
  //   if (!isChecked) {
  //     Alert.alert("You must check the box to accept the terms before registering.");
  //     return;
  //   }

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(authen, EMAIL, PASSWORD);
  //     const user = userCredential.user;
  
  //     // Lưu thông tin người dùng vào Firestore


  //     const userRef = doc(db, 'users', user.uid);
  //       await setDoc(userRef, {
  //         email: user.email,
  //         username: USERNAME,
  //         password: PASSWORD,
  //         gender: null,
  //         phone: "your phone number"
  //       });

  //     const levelsRef = collection(userRef, 'level');
  //     await setDoc(doc(levelsRef, '1'), {
  //         completed: false,
  //         isPlayed: true

  //     });
  //     await setDoc(doc(levelsRef, '2'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '3'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '4'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '5'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '6'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '7'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '8'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '9'), {
  //       completed: false,
  //       isPlayed: false,
  //     });

  
  //     console.log("User registered and data saved to Firestore.");
  //     console.log(user.uid)
      
  //     const fetchedUserId = user.uid; 
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       userId: fetchedUserId,
  //       username: USERNAME,
  //       email: EMAIL,
  //     }));
  //     SETEMAIL("");
  //     SETPASSWORD("");
  //     SETUSERNAME("");
      
  //     navigation.navigate("Signup_upImg")
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.error("Error registering user: ", errorCode, errorMessage);
  
  //     // Xử lý lỗi chi tiết
  //     switch (errorCode) {
  //       case 'auth/invalid-email':
  //         setEmailError("The email address is badly formatted.");
  //         break;
  //       case 'auth/email-already-in-use':
  //         setEmailError("The email address is already in use by another account.");
  //         break;
  //       case 'auth/weak-password':
  //         setPassError("The password is too weak.");
  //         break;
  //       // Thêm các lỗi khác nếu cần
  //       default:
  //         console.error("An unknown error occurred.");
  //         break;
  //     }
  //   }
    
  // }
  // async function onGoogleButtonPress() {
  //   try {
  //     // Đăng xuất tài khoản hiện tại
  //     await GoogleSignin.signOut();
  
  //     // Hiển thị khung để chọn tài khoản Google cần đăng nhập
  //     const { idToken, user } = await GoogleSignin.signIn();
  //     // Tạo Google credential với token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     const userCredential = await auth().signInWithCredential(googleCredential);
  //     const firebaseUser = userCredential.user;
  //     console.log(firebaseUser.uid)

     

  //     const userRef = doc(db, 'users', firebaseUser.uid);
  //       await setDoc(userRef, {
  //         email: user.email,
  //         username: user.name,
  //         password: "null",
  //         gender: null,
  //         phone: "your phone number",
  //         profileImage: user.photo,
  //       });

  //     const levelsRef = collection(userRef, 'level');
  //     await setDoc(doc(levelsRef, '1'), {
  //         completed: false,
  //         isPlayed: true

  //     });
  //     await setDoc(doc(levelsRef, '2'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '3'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '4'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '5'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '6'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '7'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '8'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
  //     await setDoc(doc(levelsRef, '9'), {
  //       completed: false,
  //       isPlayed: false,
  //     });
     

  //     console.log("User registered and data saved to Firestore.");
  //     console.log(firebaseUser.uid)
      
  //     const fetchedUserId = firebaseUser.uid; 
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       userId: fetchedUserId,
  //       email: user.email,
  //       username: user.name,
  //       profileImage: user.photo
  //     }));
  //     navigation.navigate("AppStack")
  //     // Đăng nhập người dùng với credential
  //     return auth().signInWithCredential(googleCredential);
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


return (
  <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
    <View style={{flex: 1, marginHorizontal:20, top:windowWidth*0.04}}>
      <View >
        <Text style={styles.TextCreatAccount}>Create Account</Text>
        <Text style={styles.TextSlogan}>Keithston Hotel: Book with Ease, Stay in Style!a</Text>
      </View>

      <View style={{marginBottom: 8}}>
        <Text style={styles.Text}>Username</Text>
        <View style={styles.View}>
          <TextInput
            placeholder='Enter your user name'
            placeholderTextColor={COLORS.black}
            keyboardType='email-address'
            // value={USERNAME}
            // onChangeText={(text)=>SETUSERNAME(text)}
            style={{
              width: "100%",
              color: COLORS.black
            }}/>
        </View>
        {/* {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null} */}
      </View>

      <View style={{marginBottom: 8}}>
        <Text style={styles.Text}>Email address</Text>
        <View style={styles.View}>
          <TextInput placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              // value={EMAIL}
              // onChangeText={(text)=>SETEMAIL(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>
          </View>
          {/* {emailError ? <Text style={styles.error}>{emailError}</Text> : null} */}
        </View>
        

        <View style={{marginBottom: 8}}>
          <Text style={styles.Text}>Password</Text>
          <View style={styles.View}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              // value={PASSWORD}
              // onChangeText={(text)=>SETPASSWORD(text)}
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

                {
                  isPasswordShown == true ? (
                    <Image 
                    style={styles.imgPass}
                    source={require('../img/visible.png')}/>
                  ) : (
                    <Image 
                    style={styles.imgPass}
                    source={require('../img/hide.png')}/>
                  )
                }
                 
              </TouchableOpacity>
          </View>
          {/* {passError ? <Text style={styles.error}>{passError}</Text> : null} */}
        </View>

        <View style={{
          flexDirection:"row",
          marginVertical:6,
          top: windowWidth*0.07
        }}>
          <TouchableOpacity 
          onPress={()=>handleCheckboxPress()}
          >
            {
                  isChecked == true ? (
                    <Image 
                    style={styles.imgPass}
                    source={require('../img/checkbox.png')}/>
                  ) : (
                    <Image 
                    style={styles.imgPass}
                    source={require('../img/unchecked.png')}/>
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
          // onPress={()=>SignUp()}
          style={{
            marginTop: 18, 
            marginBottom: 4,
            top: windowWidth*0.05

          }}
        />

        <View style={{flexDirection: 'row', alignItems:'center', marginVertical:20, top: windowWidth*0.03}}>
            <View
              style={styles.ViewFinal}
              />
                <Text style={{fontSize: 14, color: COLORS.black}}>Or Sign up with</Text>
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
                  justifyContent: 'center',top: windowWidth*0.005
                }}>
                   

                      <TouchableOpacity
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
                      </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          marginVertical: 22,
          bottom: windowWidth*0.02
        }}>
          <Text style={{fontSize:16, color: COLORS.black}}>Already have an account</Text>
          <Pressable
            onPress={()=> navigation.navigate("Login")}
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
  TextCreatAccount:{
    fontSize:22,
    fontWeight: 'bold',
    color: COLORS.black,
    
  },
  TextSlogan:{
    fontSize:22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
    top: windowWidth*0.025,
  },
  Text:{
    fontSize:16,
    marginVertical: 2,
    color: COLORS.black,
    fontWeight: 'bold',
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
  TextPhone:{
    fontSize:16,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: 'bold',
    top: windowWidth*0.04,
  },
  ViewPhone:{
    width: "100%",
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextCheck:{
    color: COLORS.black,
    fontSize: 15,
    left: windowWidth*0.03,
    },
  ViewFinal:{
    flex:1,
    height:1, 
    backgroundColor: COLORS.grey,marginHorizontal:10
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
  TextLogin:{
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6
  },
  error:{
    color: 'red',
    top: windowHeight*0.025
  },
  imgPass:{
    width:27,
    height:27,
  },
})