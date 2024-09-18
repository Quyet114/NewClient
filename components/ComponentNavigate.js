import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Seach from './Seach';

const Stack = createNativeStackNavigator();
const ComponentNavigate = () => {
    return (

        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Seach" component={Seach} />
        </Stack.Navigator>

    )
}

export default ComponentNavigate
