import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
const Onbroading2 = ({navigation}) => {
  return (
    <View style={Styles.Container}>
      <StatusBar barStyle='light-content' />
      <Image source={require('../../../media/imgae/meal.jpg')} style={Styles.Logo} />
      <View style={Styles.Infor}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 24, fontStyle: 'normal', fontWeight: 700, color: 'black' }}>Welcome to our food haven!</Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontStyle: 'normal', fontWeight: 700, color: 'gray' }}>Find the perfect meal for any craving among our diverse restaurant options.</Text>
      </View>
      <View style={Styles.Button}>
        <View>
          <Text style={{marginStart:30}}>o o o </Text>
        </View>
      <TouchableOpacity style={{height:48, width: 80, backgroundColor:'blue', borderRadius:5, justifyContent:'center', alignItems:'center', marginEnd:20,}}
      onPress={() => navigation.navigate('Login')}
      >
      <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontStyle: 'normal', fontWeight: 700, color: 'white' }}>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Onbroading2
const Styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    width: '100%',
    height: '60%',
    start: 0,
    width: '100%',

  },
  Infor: {
    width: '70%',
    height: '26%',
    marginEnd: '10%',
    marginTop: 10,

  },
  Button:{
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    height:'14%',
    justifyContent:'space-between'
  }
})