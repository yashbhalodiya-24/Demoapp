import { View, Text, Image, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../Screens/Main';
import LoginScreen from '../Screens/login';
import LogoutScreen from '../Screens/Logout';
import Profile from '../Screens/Profile';
import { APP_COLORS } from '../Config/Theme';


const Drawer = createDrawerNavigator();


// Custom Drawer Icon Component
const CustomDrawerIcon = () => (
  <View>
    <Image source={require('../assets/C.jpg')} style={{ width: 24, height: 24 }} />
  </View>
);
const DrawerNavigation = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex:1, backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white}}>
      <Drawer.Navigator>
        <Drawer.Screen  name="Canva" component={Main} options={{
        headerShown: true ,  headerStyle: {
          backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black, // Set header background color
        },
        headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white, }}
        />
           <Drawer.Screen  name="Profile" component={Profile} options={{
        headerShown: true ,  headerStyle: {
          backgroundColor: isDarkMode ?APP_COLORS.white : APP_COLORS.black, // Set header background color
        },
        headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,}}
        />
        <Drawer.Screen  name="Logout" component={LogoutScreen} options={{
        headerShown: false ,  headerStyle: {
          backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black, // Set header background color
        }}}/>
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigation;
