import { View, Text, Appearance, Button, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { APP_COLORS } from '../Config/Theme';

const Home = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('');
  const [data, setData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);
  // useEffect(() => {

  //   const colorScheme = Appearance.getColorScheme();
  //   console.log(colorScheme);
  //   if (colorScheme === 'dark') {
  //     setTheme('Dark');
  //   }
  //   else {
  //     setTheme('Light');
  //   }
  // })
  // const getData = async () => {
  //   const res = await axios.get('https://fakestoreapi.com/products/categories');
  //   console.log('====================================');
  //   console.log(res.data);
  //   console.log('====================================');
  // }

  const getData = () => {
    setLoading(true); // Set loading to true when data fetch starts
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          Authorization: 'Bearer',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        setData(res.data);
        setLoading(false); // Set loading to false when data fetch completes
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>


      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? APP_COLORS.blue : APP_COLORS.black} />
      ) : (

        <TouchableOpacity style={[styles.touchable, { backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]} onPress={getData}>


          <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>GET</Text>

          
        </TouchableOpacity>

      )}
      
      <FlatList data={data} ListEmptyComponent={() => (
         <Text style={{ fontSize: 20, color: isDarkMode ? APP_COLORS.white : APP_COLORS.black,flex:1,justifyContent:'center',alignSelf:'center' }}>NO DATA</Text>
      )}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 22, color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Id: {item.id}</Text>
            <Text style={{ fontSize: 22, color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Title: {item.title}</Text>
            <Text style={{ fontSize: 22, color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }}>Body: {item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({

  touchable: {
    margin: 10,
    borderRadius: 10,
    paddingLeft: 180,
    paddingRight: 180,
    padding: 20,
  },
  signup: {
    // color: "white",

  },


});

export default Home;