import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { FONT } from './fontFamilies'

const EmptyNews = () => {
  return (
    <View style={styles.container}>
      {/* logo */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../media/imgae/new.png')} style={{ height: 140, width: 150 }} />
        <Text style={{ fontSize: 18, color: 'black', position: 'absolute', start:50, bottom: 10, fontFamily: FONT.primary }}>
          <Text style={{ fontSize: 55, color: 'white', fontFamily: FONT.primary }}>N</Text>
          <Text style={{ fontSize: 38, color: 'black', fontFamily: FONT.primary }}>EWSPANB</Text>
        </Text>
      </View>
      <Text style={{color:'black', fontFamily:FONT.primary, fontSize:34, marginStart:70, marginTop:30}}>Opps...! Empty News</Text>
    </View>
  )
}

export default EmptyNews

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})