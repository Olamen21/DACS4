import { Image, StyleSheet, Text, View, Dimensions, ImageBackground, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL, API_URL_USER } from '@env';

import LogoutModal from './Logout';
import COLORS from '../style/Colors';
import axios from 'axios';
// import COLORS from '../style/Colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation}) => {
    const user_id = useSelector((state) => state.auth.user_id);
    const [userData, setUserData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(API_URL+API_URL_USER)
        // Hàm async để lấy dữ liệu người dùng
        const fetchUserData = async () => {
            try {
                const response = await axios.get(API_URL+API_URL_USER);
                const user = response.data.find(user => user._id === user_id);
                setUserData(user); 
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
            <Text style={styles.TextUser}>{userData?.username}</Text>
            <Text style={styles.TextEmail}>{userData?.email}</Text>
        </View>
      </View>
      <View style={styles.function}>
        <Pressable onPress={()=> navigation.navigate("EditProfile")}>
            <View style={[styles.button, {marginTop:windowHeight*0.03}]}>
                <FontAwesome name='user' size={30} color={COLORS.black} style={styles.iconButton}/>
                <Text style={styles.TextButton}>Edit Profile</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("ChangePass")}>
            <View style={styles.button}>
                <Fontisto name='locked' size={30} color={COLORS.black} style={styles.iconButton}/>
                <Text style={styles.TextButton}>Change Password</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("History")}>
            <View style={styles.button}>
                <Fontisto name='history' size={28} color={COLORS.black} style={styles.iconButton}/>
                <Text style={styles.TextButton}>History</Text>
            </View>
        </Pressable>
        
       
        <Pressable
            onPress={()=>setModalVisible(true)}
        >
            <View style={styles.button}>
                <MaterialCommunityIcons name='logout' size={32} color={COLORS.black} style={styles.iconButton}/>
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