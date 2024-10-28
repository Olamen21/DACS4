import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Dimensions, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import COLORS from '../style/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../components/Button'
// import { db,  collection, addDoc,query, getDocs, where, FIREBASE_AUTH, doc, getDoc, setDoc} from '../firebase/index'
// import { Screen } from 'react-native-screens'
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../components/UserContext'
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({navigation}) => {
// const Login = () => {


  // const auths = FIREBASE_AUTH;

  // const [EMAIL, SETEMAIL] = useState('');
  // const [PASSWORD, SETPASSWORD] = useState('');

  
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // const [emailError, setEmailError] = useState('');
  // const [passError, setPassError] = useState('');

  // const { users, setUser } = useContext(UserContext);
  
  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     webClientId: '591794021020-efjk9hjfccq6m942e5mf4osn46los7to.apps.googleusercontent.com',
  //   });
  // },[])
    // const Login = async () => {
    //   console.log(EMAIL);
    //   console.log(PASSWORD);
      
    //   try {
    //     const userCredential = await signInWithEmailAndPassword(auths, EMAIL, PASSWORD);
    //     const user = userCredential.user;
        
    //     console.log("Login successfully");
    //     console.log(user.uid);

    //     const fetchedUserId = user.uid; 
    //     const docRef = doc(db, "users", fetchedUserId);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       const userData = docSnap.data();
    //       setUser((prevUser) => ({
    //         ...prevUser,
    //         userId: fetchedUserId,
    //         email: userData.email,
    //         username: userData.username,
    //         profileImage: userData.profileImage,
    //       }));
    //       console.log("-----------------");
    //       console.log(userData.email);
    //       console.log(userData.username);
    //     } else {
    //       console.error("No such document!");
    //     }

    //     SETEMAIL("");
    //     SETPASSWORD("");
    //     navigation.navigate("AppStack");  
    //   } catch (error) {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error("Error login user: ", errorCode, errorMessage);

    //     // Handle detailed errors
    //     switch(errorCode){
    //       case 'auth/invalid-email':
    //         setEmailError("The email address is badly formatted.");
    //         break;
    //       case 'auth/user-not-found':
    //         setEmailError('No user found for the provided email address.');
    //         break;
    //       case 'auth/wrong-password':
    //         setPassError('The password is incorrect. Please enter it again.');
    //         break;
    //       default:
    //         console.error("An unknown error occurred.");
    //         break;
    //     }
    //   }
    // };
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
              // value={EMAIL}
              // onChangeText={(text)=>SETEMAIL(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>
          </View>
          {/* {emailError ? <Text style={styles.error}>{emailError}</Text> : null} */}
        </View>
        
        
        {/* Nhập password */}
        <View style={{marginBottom: 10}}>
          <Text style={styles.Text}>Password</Text>
          <View style={styles.View}> 
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              // secureTextEntry={!isPasswordShown}
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

                {/* Ẩn password */}
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


       
        {/* buttonLogin */}
        <Button
          title="Login"
        //   onPress={()=> Login()}
        onPress={()=> navigation.navigate("AppStack")}
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