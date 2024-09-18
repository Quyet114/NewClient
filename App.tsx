import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text, View, } from 'react-native';
import AppNavigation from './src/components/navigations/AppNavigation';
import { UserProvider } from './src/components/user/UserContext';
import ComponentNavigate from './components/ComponentNavigate';
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/components/news/screens/Home';
import Sign from './components/Login';
import EditProfile from './src/components/user/screens/EditProfile';
import Register from './src/components/user/screens/Register';
import Login from './src/components/user/screens/Login';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFontFromAsyncStorage } from './src/constain/fontFamilies';
function App(): JSX.Element {

  useEffect(() => {
    const initializeFont = async () => {
      await loadFontFromAsyncStorage();
    };

    initializeFont();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#FFF' }}>

      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </SafeAreaView>
  );
}

export default App;
