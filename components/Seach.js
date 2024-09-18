import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity, Dimensions, Alert, ToastAndroid, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext } from 'react'
const windowWith = Dimensions.get('window').width
const Seach = () => {

  const renderItem = (val) => {
    const { id, name, money, gender } = val.item;
    const onSelectItem = () => {
      setIndexPress(id);
    }
    return (
        <TouchableOpacity onPress={onSelectItem}
          style={{
            flex: 1,
            padding: 5,
            backgroundColor: 'F2F3F2',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:20,
            marginBottom:10,
            marginHorizontal:8
          }}>
          <Image source={{ uri: gender }} style={{ height: 100, width: 100 }} />
          <Text style={{ fontSize: 18, margin: 8, }} >{name}</Text>

        </TouchableOpacity>
    )
  }

  return (
    <View style={{ width: windowWith - 20, marginStart: 10, backgroundColor:'#FFF'}}>
      <View style={{alignItems:'center', justifyContent:'center', height:100}}>
        <Text style={{color:'black', fontWeight:500, fontSize:24}}>Daftar Product</Text>
        <View style={{flexDirection:'row', height:50, borderRadius:10, backgroundColor:'#F2F3F2', width:'100%', alignItems:'center'}}>
          <Image source={require('../src/media/imgae/Seach.png')} style={{margin:5}}/>
          <Text>Cari Products</Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        numColumns={2}
        keyExtractor={(item) => item.id} // Khóa mỗi mục dựa trên id
        renderItem={renderItem} // Component cho mỗi mục
        showsHorizontalScrollIndicator={false} // ấn thanh cuộn dọc
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn ngang
      />
    </View>
  )
}

export default Seach
var DATA = [{ "id": 1, "name": "Ronda", "money": "$7.07", "gender": "http://dummyimage.com/247x100.png/ff4444/ffffff" },
{ "id": 2, "name": "Florie", "money": "$0.58", "gender": "http://dummyimage.com/121x100.png/cc0000/ffffff" },
{ "id": 3, "name": "Keri", "money": "$3.45", "gender": "http://dummyimage.com/197x100.png/cc0000/ffffff" },
{ "id": 4, "name": "Charlton", "money": "$0.52", "gender": "http://dummyimage.com/156x100.png/5fa2dd/ffffff" },
{ "id": 5, "name": "Davita", "money": "$8.06", "gender": "http://dummyimage.com/197x100.png/dddddd/000000" },
{ "id": 6, "name": "Natalee", "money": "$7.92", "gender": "http://dummyimage.com/113x100.png/cc0000/ffffff" },
{ "id": 7, "name": "Bar", "money": "$0.19", "gender": "http://dummyimage.com/188x100.png/dddddd/000000" },
{ "id": 8, "name": "Arron", "money": "$3.36", "gender": "http://dummyimage.com/114x100.png/cc0000/ffffff" },
{ "id": 9, "name": "Hana", "money": "$9.55", "gender": "http://dummyimage.com/112x100.png/dddddd/000000" },
{ "id": 10, "name": "Consuela", "money": "$1.07", "gender": "http://dummyimage.com/114x100.png/cc0000/ffffff" }]