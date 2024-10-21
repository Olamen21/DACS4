import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './screen/Home';
import Favourite from './screen/Favourite';
import Booking from './screen/Booking';
import Profile from './screen/Profile';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused,color,size }) => {
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
                                return <Icon name={iconName} size={size} color={color}/>;},
                    tabBarActiveTintColor: '#13881A',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    headerShown: false,
                })}>
                    <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
                    <Tab.Screen name="Favourite" component={Favourite} options={{ tabBarLabel: 'Favourite' }} />
                    <Tab.Screen name="Booking" component={Booking} options={{ tabBarLabel: 'Booking' }} />
                    <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
