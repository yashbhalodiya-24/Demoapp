import { View, Text } from 'react-native';
import React from 'react';
import BottomNavigator from '../navigation/BottomNavigator';
import DrawerNavigation from '../navigation/DrawerNavigation';

const Parent = () => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigation />
      <BottomNavigator/>
    </View>

  );

};

export default Parent;