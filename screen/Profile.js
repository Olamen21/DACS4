import { Image, StyleSheet, Text, View, Dimensions, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import LogoutModal from './Logout';
// import COLORS from '../style/Colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation}) => {
    

    const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.ImgContain}>
        <View style={styles.ViewImg}>

            <Image
                source={require('../img/avt.jpg')}
                style={styles.Img_user}
            />
        </View>
        <View style={styles.username}>
            <Text style={styles.TextUser}>Username</Text>
            <Text style={styles.TextEmail}>username@gmail.com</Text>
        </View>
      </View>
      <View style={styles.function}>
        <Pressable onPress={()=> navigation.navigate("EditProfile")}>
            <View style={[styles.button, {marginTop:windowHeight*0.03}]}>
                <Image source={require('../img/user.png')} style={styles.iconButton} />
                <Text style={styles.TextButton}>Edit Profile</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("ChangePass")}>
            <View style={styles.button}>
                <Image source={require('../img/padlock.png')} style={styles.iconButton} />
                <Text style={styles.TextButton}>Change Password</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("History")}>
            <View style={styles.button}>
                <Image source={require('../img/history.png')} style={styles.iconButton} />
                <Text style={styles.TextButton}>History</Text>
            </View>
        </Pressable>
        
       
        <Pressable
            onPress={()=>setModalVisible(true)}
        >
            <View style={styles.button}>
                <Image source={require('../img/logout.png')} style={styles.iconButton} />
                <Text style={styles.TextButton}>Logout</Text>
            </View>
            <LogoutModal 
                visible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
                navigation={navigation}
            />

        </Pressable>

      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5',
    },
   
    ImgContain:{
        marginBottom:windowHeight*0.12,
    },
    Img_user:{
        height:150, 
        width: 150, 
        borderRadius: 100, 
        alignSelf: 'center',
        marginTop: windowHeight*0.07,
        borderWidth:3,
        borderColor: 'black',

    },
    username:{
        textAlign:'center',
        alignSelf: 'center',
    },
    TextUser:{
        color:'black',
        fontSize: 33,
        alignSelf: 'center',
    },
    TextEmail:{
        color:'grey',
        fontSize: 18,
        alignSelf: 'center',
        // marginTop:windowHeight*0.01,
    },
    function:{
        backgroundColor:'white',
        flex:1,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    button:{
        flexDirection:'row',
        marginLeft:windowWidth*0.05,
        marginRight:windowWidth*0.05,
        height:windowHeight*0.08,
        marginTop: windowWidth*0.03,
        
    },
    iconButton:{
        width:27,
        height:27,
        opacity:0.5,
        margin:18,
    },
    TextButton:{
        color: 'black',
        fontSize:20,
        flex:1,
        margin:16,
    }
})