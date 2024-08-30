import { View, Text, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Color } from 'react-native/Libraries/NewAppScreen';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('login');
      setTimeout(get_email,2000)
    }, 2000);
  }, []);
const get_email = async () => {
  let email = await AsyncStorage.getItem('email');
  if (email) {
    navigation.navigate('Parent');
  } else {
    navigation.navigate('login');
  }
}

  return (
    // <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center" , height:100 }}>
    //   <Image source={require('../C.jpg')}/>
    // </View>
 <ImageBackground source={require('../assets/C.jpg')} style={{flex:1, justifyContent: "center", alignContent: "center"}}></ImageBackground>
  );

};

export default Splash;