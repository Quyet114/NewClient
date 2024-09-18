import { View, Text ,Image,StatusBar, StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'

const Onbroading1 = ({navigation}) => {
  return (
    <TouchableOpacity style={Styles.Container}
    onPress={() => navigation.navigate('Onbroading2')}
    >
        {/* <StatusBar barStyle='light-content' /> */}
      <Image source={require('../../../media/imgae/welcome.jpg')} style={Styles.Logo}/>
    </TouchableOpacity>
  )
}

export default Onbroading1
const Styles = StyleSheet.create({
    Container:{
        height:'100%',
        width:'100%',
        backgroundColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
    },
    Logo:{
        height:'100%',
        width:'100%'

    }
})