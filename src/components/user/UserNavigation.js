import { StyleSheet, Text, View } from 'react-native'
import React  from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Verification from './screens/Verification';
import Onbroading1 from '../news/screens/Onbroading1';
import Onbroading2 from '../news/screens/Onbroading2';
import ForgotPassword from './screens/ForgotPassword';
import Register from './screens/Register';
const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onbroading1" component={Onbroading1} options={{ headerShown: false }}/>
      <Stack.Screen name="Onbroading2" component={Onbroading2} options={{ headerShown: false }}/>
      <Stack.Screen name="Forgotpassword" component={ForgotPassword} options={{ headerTitle: ''}} />
      <Stack.Screen name="Verification" component={ Verification}/>
      <Stack.Screen name="Login" component = {Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerTitle: ''}}/>
    </Stack.Navigator>
  )
}

export default UserNavigation

const styles = StyleSheet.create({})