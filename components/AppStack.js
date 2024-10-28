import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import Stack Navigator
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screen/Home';
import Favourite from '../screen/Favourite';
import Booking from '../screen/Booking';
import Profile from '../screen/Profile';
import EditProfile from '../screen/EditProfile';
import ChangePass from '../screen/ChangePass';
import History from '../screen/History';

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
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'Booking') {
            iconName = focused ? 'calendar' : 'calendar-o';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#13881A',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Favourite" component={Favourite} options={{ tabBarLabel: 'Favourite' }} />
      <Tab.Screen name="Booking" component={Booking} options={{ tabBarLabel: 'Booking' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default AppStack;
