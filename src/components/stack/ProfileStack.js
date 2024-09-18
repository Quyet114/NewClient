import { StyleSheet, Text, View } from 'react-native'
import React,{ useContext }  from 'react'
import Login from '../user/screens/Login';
import Register from '../user/screens/Register';
import Setting from '../user/screens/Setting';
import EditProfile from '../user/screens/EditProfile';
import ForgotPassword from '../user/screens/ForgotPassword';
import ResetPassword from '../user/screens/ResetPassword';
import Verification from '../user/screens/Verification';
import Profile from '../user/screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../user/UserContext';  
import { FONT } from '../../constain/fontFamilies';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  const { user } = useContext(UserContext);
  return (
    <View style={{flex:1}}>
      <Stack.Navigator initialRouteName={user ? "Profile" : "Login"}  screenOptions={{
        
        headerShown: true
      }} >
         <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false , headerStyle:FONT.primary}} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}}/>
        <Stack.Screen name="Setting" component={Setting} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}}/>
        <Stack.Screen name="Verification" component={Verification} options={{headerTitleStyle:{fontFamily:FONT.primary, fontSize:22}}}/>
      </Stack.Navigator>
    </View>

  )
}

export default ProfileStack

const styles = StyleSheet.create({})