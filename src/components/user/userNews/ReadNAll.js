import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Image } from 'react-native';
import ICON from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONT, DateOfTimePost, formatNumber } from '../../../constain/fontFamilies';

const ReadNAll = ({ dataRead }) => {
  const navigation = useNavigation()
  const ItemToday = ({ item }) => {
    return (
      <TouchableOpacity style={[{
        height: 140, width: '100%', flexDirection: 'column', marginBottom: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFF0', borderRadius: 10
      }]}
        onPress={() => { navigation.navigate('NewDetail', { data: item }) }}

      >
        <View style={{ height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.headerContent}>
            <Text style={{ position: 'absolute', color: 'black', fontFamily: FONT.primary, height: 40, width: 80, top: -20 }}>{item.categories[0].name}</Text>
            <Text style={{ color: COLOR.D, fontSize: 15, marginBottom: 4, fontFamily: FONT.primary, textAlign: 'justify' }} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
            <Text style={{ color: COLOR.D, fontSize: 14, fontFamily: FONT.primary, textAlign: 'justify' }} numberOfLines={5} ellipsizeMode="tail">
              {item.text}
            </Text>
            <View style={styles.headerPage}>
            <Image source={{ uri: item.creator?.avatar }} style={[{ height: 25, width: 25, borderRadius: 3, borderWidth: 1, borderRadius: 30, borderColor: 'gray', marginStart:5 } ]} />
              <Text style={{ flex: 2, fontSize: 12, fontFamily: FONT.primary, fontWeight: "500", marginStart: 10 }}>{item.creator.name}</Text>
              <Text style={{ flex: 3, fontSize: 12, fontFamily: FONT.primary, fontWeight: "500", position: 'absolute', end: 5, top: 7 }}>{DateOfTimePost(item?.createdAt)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', height: '20%', marginTop:5 }}>
            <View style={styles.shadowContainer}>
              <Image source={{ uri: item.images[0] }} style={{ height: 100, width: 140, borderRadius: 5 }} resizeMode="cover"
              />
            </View>
            <View style={{ height: 20, width: 140, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>

              <View style={{ flexDirection: 'row', flex: 1.5, alignItems: 'center' }}>
                <ICON name='hearto' color={'black'} size={18} />
                <Text style={{ marginStart: 3, fontSize: 13, fontFamily: FONT.primary }}>{formatNumber(item?.likes?.length)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ICON name='eyeo' color={'black'} size={18} style={{ flex: 1 }} />
                <Text style={{ marginStart: 3, fontSize: 13, flex: 2, fontFamily: FONT.primary }}>{formatNumber(item?.reads)}</Text>
              </View>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.body}>
        <FlatList
          data={dataRead}
          renderItem={ItemToday}
          keyExtractor={(item) => item._id}
        />
      </View>

    </View>
  )
}

export default ReadNAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 35,
    marginTop: 5
  },
  header: {
    marginVertical: 8,
  },
  body: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 1,
    paddingBottom:180
  },
  headerPage: {
    marginEnd: 5,
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  headerContent: {
    flex: 5,
    marginEnd: 5,
    height: '80%',
    flexDirection: 'column'
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    height: 101, width: 141,
    backgroundColor: 'white'
  },
})