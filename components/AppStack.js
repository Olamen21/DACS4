import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import Stack Navigator
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Home,
  Favourite,
  Booking,
  Profile,
  EditProfile,
  ChangePass,
  History,
  ChatBot,
  FindSearchScreen,
  SearchFilterScreen,
  RoomDetail,
  BookingHotel,
  HotelInCity,
} from '../screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Tạo Stack Navigator

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }} // Ẩn header cho tab navigator
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
      <Stack.Screen
        name="ChangePass"
        component={ChangePass}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetail}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
      <Stack.Screen
        name="BookingHotel"
        component={BookingHotel}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
        <Stack.Screen
        name="HotelInCity"
        component={HotelInCity}
        options={{ headerShown: false }} // Hiện header cho EditProfile
      />
    </Stack.Navigator>

  );
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeMain'   component={Home}/>
      <Stack.Screen name='FindSearch' component={FindSearchScreen}/>
    </Stack.Navigator>
  );
}



// Tạo một component riêng cho Tab Navigator
const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Thiết lập icon dựa trên tab hiện tại
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Favourite':
              iconName = 'heart';
              break;
            case 'Booking':
              iconName = 'calendar';
              break;
            case 'ChatBot':
              iconName = 'comments';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'question-circle'; // Icon mặc định
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#13881A', // Màu cho tab được chọn
        tabBarInactiveTintColor: 'gray', // Màu cho tab không được chọn
        tabBarLabelStyle: {
          fontSize: 14, // Kích thước chữ cho label
        },
        headerShown: false,
        tabBarStyle: {
          display: route.name === 'ChatBot' ? 'none' : 'flex', // Ẩn thanh tab khi ở màn hình ChatBot
        },
      })}
    >
      <Tab.Screen name="Home"         component={HomeStack}     options={{ tabBarLabel: 'Home' }}           />
      <Tab.Screen name="Favourite"    component={Favourite}     options={{ tabBarLabel: 'Favourite' }}      />
      <Tab.Screen name="Booking"      component={Booking}       options={{ tabBarLabel: 'Booking' }}        />
      <Tab.Screen name="ChatBot"      component={ChatBot}       options={{ tabBarLabel: 'Chatbot' }}        />
      <Tab.Screen name="Profile"      component={Profile}       options={{ tabBarLabel: 'Profile' }}        />
    </Tab.Navigator>
  );
};

export default AppStack;
