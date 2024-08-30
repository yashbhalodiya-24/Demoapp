import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Parent from '../Screens/Parent';
import Main from '../Screens/Main';
import DrawerNavigation from './DrawerNavigation';
import LoginScreen from '../Screens/login';
import Signup from '../Screens/Signup';
import Language from '../Screens/Language';
import { APP_COLORS } from '../Config/Theme';
import Logout from '../Screens/Logout';

const Stack = createStackNavigator();

const AppNaviagtor = () => {
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Parent' component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name = 'login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name = 'Signup' component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name = 'Logout' component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name = 'Language' component={Language} options={{ headerShown: true,  headerStyle: {
          backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black, // Set header background color
        },
        headerTintColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  ;
}

export default AppNaviagtor;
