
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Scene1 from './Scene1';
import Scene3 from './Scene3';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const tab = createBottomTabNavigator();
const Scene5 = () => {
    return (
        
        <tab.Navigator 
            initialRouteName='Home'
            screenOptions={({route})=> ({
                headerShown: false,
                tabBarIcon:({ focused, color, size})=>{
                    if(focused){
                        if(route.name === 'Home'){
                            
                        }
                    }
                }
            })}
        >
            <Stack.Screen component={Scene3} name='Home' />
            <Stack.Screen component={Scene1} name='Haha' />
        </tab.Navigator>

    )
}

export default Scene5

const styles = StyleSheet.create({})