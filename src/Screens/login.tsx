import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, BackHandler, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_COLORS } from '../Config/Theme';
import { SvgXml } from 'react-native-svg';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const IconSvgXml = {
    Plus: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 40 40" id="Слой_1" version="1.1" viewBox="0 0 40 40" xml:space="preserve"><g><path d="M28.1,26.8c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3l-6.8-6.8l-6.8,6.8c-0.2,0.2-0.5,0.3-0.7,0.3   s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6.8-6.8l-6.8-6.8c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l6.8,6.8l6.8-6.8   c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L21.3,20L28.1,26.8z"/></g><g><path d="M19.9,40c-11,0-20-9-20-20s9-20,20-20c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2   c-3.2-2.5-7-3.8-11-3.8c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4   c0.5-0.3,1.1-0.1,1.4,0.3c1.8,3.1,2.8,6.6,2.8,10.2C39.9,31,30.9,40,19.9,40z"/></g></svg>
    `,
  };

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
        }
      } catch (error) {
        console.error('Failed to load credentials from storage', error);
      }
    };

    loadCredentials();

    const backAction = () => {
      return true; // Disable back button
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    // Basic email validation
    setIsLoading(true);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Basic password validation
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Clear error message if there was one previously
    setError('');

    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (storedEmail && storedPassword) {
        if (email === storedEmail && password === storedPassword) {
          // Navigate to the Parent screen if credentials match
          // setModalMessage('Login successful!');
          // setModalVisible(true);
          setTimeout(() => {
            // setModalVisible(false);
            setIsLoading(true)
            navigation.navigate('Parent');
          }, 2000);
        } else {
          setError('Invalid email or password');
          setModalMessage('Invalid email or password');
          setModalVisible(true);
        }
      } else {
        setError('No user found. Please sign up first.');
        setModalMessage('No user found. Please sign up first.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to validate credentials', error);
      setModalMessage('An error occurred. Please try again.');
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupNavigation = () => {
    // Navigate to the sign-up screen
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={APP_COLORS.black}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={{ margin: 7 }}></View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={APP_COLORS.black}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.passwordVisibilityIcon}>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.touchable} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator color={APP_COLORS.white} />
        ) : (
          <Text style={{ color: APP_COLORS.white,marginLeft:30}}>Submit</Text>
        )}
      </TouchableOpacity>
      <View style={{ margin: 7 }}></View>
      <TouchableOpacity onPress={handleSignupNavigation}>
        <Text style={styles.signup}>Sign Up...!</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closetouch} onPress={()=> setModalVisible(false)}>
          <SvgXml xml={IconSvgXml.Plus} width={25} height={25} fill="#000" />
          </TouchableOpacity>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalokButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 50,
    fontWeight: "bold",
    color: APP_COLORS.black,
  },
  input: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    elevation: 10,
    height: 45,
    width: '100%',
    color: APP_COLORS.black,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: APP_COLORS.red,
    marginBottom: 10,
  },
  touchable: {
    padding: 10,
    paddingLeft: 150,
    paddingRight: 150,
    margin: 15,
    backgroundColor: APP_COLORS.loginback,
    borderRadius: 10,
    width: "100%",
    marginVertical: 20,
  },
  signup: {
    color: APP_COLORS.black,
  },
  passwordVisibilityIcon: {
    color: APP_COLORS.black,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
   paddingBottom:50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: APP_COLORS.white,
    padding: 70,
    borderRadius: 40,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: APP_COLORS.black,
  },
  modalokButton: {
    backgroundColor: APP_COLORS.loginback,
    padding: 10,
    paddingRight:20,
    paddingLeft:20,
    borderRadius: 5,
    // marginRight:200,
    marginHorizontal:30,
  },
 
 closetouch:{
left:180,
bottom:30,
 },
 
  modalButtonText: {
    color: APP_COLORS.white,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: APP_COLORS.black,
  },
});

export default LoginScreen;
