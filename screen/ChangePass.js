import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../style/Colors';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePass = ({navigation}) => {
  const [isPassOldShown, setIsPassOldShown] = useState(false);
  const [isPassNewShown, setIsPassNewShown] = useState(false);
  const [isPassNewAgainShown, setIsPassNewAgainShown] = useState(false);


  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}  
      enableOnAndroid={true}  
    >
      <View style={styles.header}>
      <Pressable onPress={()=>navigation.navigate("Profile")}>
          <Image source={require('../img/back.png')} style={styles.Img_back} />
      </Pressable>
        <Text style={styles.titleHeader}>Change Password</Text>
        {/* <Image source={require('../img/diskette.png')} style={styles.Img_save} /> */}
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Old Password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassOldShown}
              // value={PASSWORD}
              // onChangeText={(text)=>SETPASSWORD(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>

              <TouchableOpacity
                onPress={()=> setIsPassOldShown(!isPassOldShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >

                {
                  isPassOldShown == true ? (
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
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>New Password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassNewShown}
              // value={PASSWORD}
              // onChangeText={(text)=>SETPASSWORD(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>

              <TouchableOpacity
                onPress={()=> setIsPassNewShown(!isPassNewShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >

                {
                  isPassNewShown == true ? (
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
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Confirm your new password</Text>
          <View style={styles.fill}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPassNewAgainShown}
              // value={PASSWORD}
              // onChangeText={(text)=>SETPASSWORD(text)}
              style={{
                width: "100%",
                color: COLORS.black
              }}/>

              <TouchableOpacity
                onPress={()=> setIsPassNewAgainShown(!isPassNewAgainShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >

                {
                  isPassNewAgainShown == true ? (
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
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Cancel"
          // onPress={()=>SignUp()}
          style={{
            width:"48%",
          }}
        />
        <Button
          title="Save Change"
          filled 
          // onPress={()=>SignUp()}
          style={{
            width:"48%"
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
    flex:0.95
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
  fill:{
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  imgPass:{
    width:27,
    height:27,
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:windowWidth*0.03,
    paddingRight:windowWidth*0.03
  }
});

export default ChangePass;
