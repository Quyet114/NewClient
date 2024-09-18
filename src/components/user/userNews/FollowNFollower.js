

import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Image } from 'react-native';
import ICON from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONT, DateOfTimePost, formatNumber, getDateAndDay } from '../../../constain/fontFamilies';
import { UserContext } from '../UserContext';
//fetchMyFollow:  [{"_id": "66b0f08b8c37080ef944ba48", 
//"followeeId": {"__v": 1, "_id": "66b0ec30101aa84f4ed56382", "authenticated": true, 
//"avatar": "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-zalo-50-29-15-13-16.jpg",
// "createdAt": "2024-08-05T15:13:52.687Z", "email": "tquyet1998@gmail.com", "follower": [Array],
// "likeHistory": [Array], "name": "World stories", "password": "$2b$10$26ns7EfATSu0sboZAlxgm.LDhL1voScBaX8gIHgE3GxG6Kp7SibXa",
// "readHistory": [Array], "updatedAt": "2024-08-05T15:32:27.542Z", "vetify": false}, "status": "2"}]
const FollowNFollower = ({ dataFollow }) => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  console.log(user);

  const ItemToday = ({ item }) => {
    return (
      <TouchableOpacity style={{ height: 100, width: '100%', flexDirection: 'column', marginBottom: 2 }}
        onPress={() => { 
          if(user.user.authenticated == true){
          }else{
            navigation.navigate('PageProfile', { item }) 
          }
        }}

      >
        <View style={{ height: 80, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.headerContent}>
            <Image source={{ uri: item.followeeId?.avatar }} style={{ height: 60, width: 60, borderRadius: 3, borderWidth: 1, borderRadius: 20, borderColor: 'gray' }} />
            <View>
              <Text style={{ flex: 2, fontSize: 22, fontFamily: FONT.primary, marginStart: 10, color: 'black' }}>{item.followeeId.name}</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: FONT.primary, marginStart: 10, color: 'black' }}>Created At: {getDateAndDay(item.followeeId.createdAt)}</Text>

            </View>
          </View>
          {user.user.authenticated == true ?
            <View style={{ flexDirection: 'column', height: '100%', flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            </View>
            :
            <View style={{ flexDirection: 'column', height: '100%', flex: 3, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.T, padding: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 18, fontFamily: FONT.primary, marginStart: 10, color: 'black' }}>Followed</Text>
              </TouchableOpacity>
            </View>
          }

        </View>
        <View style={{ height: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: FONT.primary, color: 'black', fontSize: 8, overflow: 'hidden' }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
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
          data={dataFollow}
          renderItem={ItemToday}
          keyExtractor={(item) => item._id}
        />
      </View>

    </View>
  )
}

export default FollowNFollower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 0
  },
  header: {
    marginVertical: 8,
  },
  body: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20
  },
  headerPage: {
    marginEnd: 5,
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  headerContent: {
    flex: 5,
    marginEnd: 5,
    height: '70%',
    flexDirection: 'row'
  },
})