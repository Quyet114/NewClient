import { StyleSheet, Text, View ,FlatList,Dimensions, TouchableOpacity  } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import ICON from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;


const Shorts = ({ dataShort }) => {
  //console.log('short data: ', dataShort);
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
     <FlatList
      data={dataShort}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => {

        return (
          <TouchableOpacity style={[styles.item, { height: 180 }]}
          onPress={() => { navigation.navigate('ShortsOfUser', { index, dataShort } )}}
          >
            <FastImage
            source={{uri: item.images[0]}}
            style={{height:'100%', width:'100%'}}
            resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{position:'absolute', bottom: 2, start:2, flexDirection:'row'}}>
              <ICON name='playcircleo' size={18} color={'white'}/>
              <Text style={{color:'white', marginStart:5}}>
                {item.reads}
              </Text>
              </View>
          </TouchableOpacity>
        );
      }}
      numColumns={3} // Hiển thị 3 item trên mỗi hàng
    />
    </View>
  )
}

export default Shorts

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  item: { // Đảm bảo các item có kích thước đều nhau
    margin: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth /3 -1
  },
})