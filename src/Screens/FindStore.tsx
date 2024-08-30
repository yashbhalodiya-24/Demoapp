import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_COLORS } from '../Config/Theme';

const FindStore = () => {
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

  const deletedata = () => {
    axios.delete('https://fakestoreapi.com/products/6',{method:"DELETE"}).then (res=>{
      console.log('====================================');
      console.log("delete",res.data);
      console.log('====================================');
    })
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white}}>
      <Text style={{color: isDarkMode ? APP_COLORS.white : APP_COLORS.black}}>Find Store</Text>
    </View>
  );
  ;
}

export default FindStore;