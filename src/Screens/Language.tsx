import React, { Component, useEffect, useState } from 'react';
import { Appearance, Text, View } from 'react-native';
import { APP_COLORS } from '../Config/Theme';

const Language = () =>{
  const [theme,setTheme] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return(
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white}}>
    </View>
  )
}

export default Language;
