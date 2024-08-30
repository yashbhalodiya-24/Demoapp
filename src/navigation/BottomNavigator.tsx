import { View, Text, Image, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Newfeature from '../Screens/Newfeature';
import Sale from '../Screens/Sale';
import FindStore from '../Screens/FindStore';
import { APP_COLORS } from '../Config/Theme';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
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
<View style={{flex:1, backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>
    <Bottom.Navigator>
      <Bottom.Screen name="Home" component={Home} options={{
        headerShown: false, tabBarIcon: () => {
          return (
            <Image source={require('../assets/home.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        },
      }}/>
      <Bottom.Screen name="New & Featured" component={Newfeature} options={{
        headerShown: false, tabBarIcon: () => {
          return (
            <Image source={require('../assets/new.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        },
      }} />
      <Bottom.Screen name="Sale" component={Sale} options={{
        headerShown: false, tabBarIcon: () => {
          return (
            <Image source={require('../assets/sales.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        },
      }}
      />
       <Bottom.Screen name="Find Store" component={FindStore} options={{
        headerShown: false, tabBarIcon: () => {
          return (
            <Image source={require('../assets/store.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        },
      }}
      />
    </Bottom.Navigator>
    </View>
  );
  ;
}

export default BottomNavigator;