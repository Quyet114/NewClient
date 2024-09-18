import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import UserNavigation from '../user/UserNavigation'
import HomeNavigation from './HomeNavigation'
import { UserContext } from '../user/UserContext'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const AppNavigation = () => {

  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})