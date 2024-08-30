import { View, Text, Appearance, Modal, Button, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_COLORS } from '../Config/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Share from 'react-native-share';

const Sale = () => {
  const [theme, setTheme] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const putdata = async () => {
    setLoading(true); // Set loading to true when data put starts
    const data = {
      title: 'tree',
      price: 99.9,
      description: 'i am groot',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
    };
    try {
      const res = await axios.put('https://fakestoreapi.com/products/6', data);
      console.log('====================================');
      console.log('put', res.data);
      console.log('====================================');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when data put completes or fails
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const share = () => {
    const options = {
      message: "Hi, this is a new trade strategy",
      url: "https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%201_Introduction%20to%20Stock%20Markets.pdf",
    }
    Share.open(options)
      .then((res) => console.log(res))
      .catch((err) => err && console.log(err));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black,
          borderRadius: 10,
          margin: 40,
          padding: 40,
          alignItems: 'center',
        }}
        onPress={() => setShow(true)}>
        <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white, fontSize: 22 }}>
          {date ? `Your Selected Date Is: ${date.toDateString()}` : 'Click To Select Date'}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          textColor={APP_COLORS.black}
        />
      )}
      <View style={{ marginHorizontal: 30 }}>
        <TouchableOpacity
          style={{
            backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black,
            padding: 20,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 10,
          }}
          onPress={share}>
          <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white, fontSize: 20 }}>Share Anything</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.black,
            padding: 20,
            borderRadius: 10,
          }}
          onPress={putdata}>
          <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white, fontSize: 20 }}>Put Data</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <ActivityIndicator size="large" color={isDarkMode ? APP_COLORS.black : APP_COLORS.white} />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Sale;
