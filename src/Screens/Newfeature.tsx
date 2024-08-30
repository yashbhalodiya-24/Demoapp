import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { APP_COLORS } from '../Config/Theme';



const Newfeature = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

const getDataPost = async () =>{
  const data ={
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
  }
  axios
  .post('https://fakestoreapi.com/products',data).then (res =>{
    console.log('====================================');
    console.log("Post",res.data);
    console.log('====================================');
  })
// const res = await axios.post('https://fakestoreapi.com/products',data)
//  console.log('====================================');
//  console.log(res.data);
//  console.log('====================================');
}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>
      {/* <Text style={{color: isDarkMode ? '#fff' : '#000',fontSize:25}}>{t('new')}</Text>
      <Text style={{color: isDarkMode ? '#fff' : '#000',fontSize:25}}>{t('enlang')}</Text> */}

      <Text style={{color: isDarkMode ? APP_COLORS.white : APP_COLORS.black,fontSize:25}}>{t('new&features')}</Text>
      <Text style={{color: isDarkMode ? APP_COLORS.white : APP_COLORS.black,fontSize:25}}>{t('russianlanguage')}</Text>
    </View>
  );
  ;
}

export default Newfeature;