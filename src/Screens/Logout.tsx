import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Appearance, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_COLORS } from '../Config/Theme';

const LogoutScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Clear email from AsyncStorage
      await AsyncStorage.removeItem('email');
      // Navigate to the login screen and reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.error('Failed to clear user data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowLoader(true);
    // Simulate some delay if needed
    setTimeout(() => {
      setShowLoader(false);
      // Navigate back to the previous screen or any other desired action
      navigation.goBack();
    }, 1000);
  };

  const confirmLogout = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? APP_COLORS.gray : APP_COLORS.white }]}>
      <Text style={[styles.message, { color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]}>
        Are you sure you want to logout?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.logout, { backgroundColor: isDarkMode ? APP_COLORS.white : APP_COLORS.gray }]}
          onPress={confirmLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={isDarkMode ? APP_COLORS.black : APP_COLORS.white} />
          ) : (
            <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>Logout</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.logout, { backgroundColor: isDarkMode ? APP_COLORS.white : '#333' }]}
          onPress={handleCancel}
          disabled={isLoading}
        >
          {showLoader ? (
            <ActivityIndicator color={isDarkMode ? APP_COLORS.black : APP_COLORS.white} />
          ) : (
            <Text style={{ color: isDarkMode ? APP_COLORS.black : APP_COLORS.white }}>Cancel</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you really want to logout?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={() => {
                  setIsModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
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
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  logout: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 100,
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: 'black',
  },
  modalButtonNo: {
    backgroundColor: 'black',
  },
  modalButtonText: {
    color: 'white',
  },
});

export default LogoutScreen;
