import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Appearance,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';
import { APP_COLORS } from '../Config/Theme';
import TONY from '../assets/TONY.png';

const Profile = ({ navigation }) => {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileImage(image.path);
    });
  };

  const handlepresslang = () => {
    navigation.navigate('Language');
  };

  const IconSvgXml = {
    Plus: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/>
      </svg>
    `,
    lang: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z"/>
      </svg>
    `,
    location: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
      </svg>
    `,
    email: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
      </svg>
    `,
    notification: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.3-18.9s3.1-24.9-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.8 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm64 448H160c0 17.7 7.2 34.6 20 47s29.3 20 47 20 34.6-7.2 47-20 20-29.3 20-47z"/>
      </svg>
    `,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? APP_COLORS.black : APP_COLORS.white,
    },
    // Add the rest of the styles here
    settingsContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
      padding: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      padding: 10,
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
      borderRadius: 5,
    },
    settingText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      padding: 10,
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
      borderRadius: 5,
    },
    langbuttonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      right: 270,
    },
    lockbuttonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      right: 280,
    },
    emailbuttonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      right: 300,
    },
    notebuttonText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
      right: 250,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#f5f5f5',
      marginBottom: 10,
    },
    addPhotoIcon: {
      position: 'absolute',
      top: 70,
      right: 140,
      backgroundColor: APP_COLORS.black,
      borderRadius: 50,
      padding: 5,
    },
    profileName: {
      marginTop: 5,
      fontSize: 19,
      fontWeight: '600',
      // color: '#414d63',
      textAlign: 'center',
    },
    profileAddress: {
      marginTop: 5,
      fontSize: 16,
      padding: 5,
      // color: '#989898',
      textAlign: 'center',
    },
    // Add more styles if needed
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.settingsContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : TONY}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.addPhotoIcon} onPress={choosePhotoFromLibrary}>
              <SvgXml xml={IconSvgXml.Plus} width={20} height={15} fill="#fff" />
            </TouchableOpacity>
            <Text style={[styles.profileName, { color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]}>Tony Stark</Text>

            <Text style={[styles.profileAddress, { color: isDarkMode ? APP_COLORS.white : APP_COLORS.black }]}>
              4484 Brown Bear Street,Los Angeles,California,90017.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.setting}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={form.darkMode}
                onValueChange={(value) => setForm({ ...form, darkMode: value })}
              />
            </View>
            <View style={styles.setting}>
              <Text style={styles.settingText}>Email Notifications</Text>
              <Switch
                value={form.emailNotifications}
                onValueChange={(value) => setForm({ ...form, emailNotifications: value })}
              />
            </View>
            <View style={styles.setting}>
              <Text style={styles.settingText}>Push Notifications</Text>
              <Switch
                value={form.pushNotifications}
                onValueChange={(value) => setForm({ ...form, pushNotifications: value })}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.button} onPress={handlepresslang}>
              <SvgXml xml={IconSvgXml.lang} width={24} height={24} />
              <Text style={styles.langbuttonText}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
              <SvgXml xml={IconSvgXml.location} width={24} height={24} />
              <Text style={styles.lockbuttonText}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
              <SvgXml xml={IconSvgXml.email} width={24} height={24} />
              <Text style={styles.emailbuttonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
              <SvgXml xml={IconSvgXml.notification} width={24} height={24} />
              <Text style={styles.notebuttonText}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
