import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity ,RefreshControl } from 'react-native';
import ICON from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONT, DateOfTimePost, formatNumber,getDateAndDay } from '../../constain/fontFamilies';

const TodayList = ({ data,onRefresh, isRefreshing }) => {
  const navigation = useNavigation();
  const [fontFamily, setFontFamily] = useState(FONT.primary);

  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);

  const ItemNew = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ height: 170, width: '100%', flexDirection: 'column', marginBottom: 2 }}
        onPress={() => navigation.navigate('NewDetail', { data: item })}
      >
        <View style={{ height: '90%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.headerContent}>
            <Text style={{ color: COLOR.D, fontSize: 15, marginBottom: 4, fontFamily, textAlign: 'justify' }} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={{ color: COLOR.D, fontSize: 13, fontFamily, textAlign: 'justify' }} numberOfLines={5} ellipsizeMode="tail">
              {item.text}
            </Text>
            <View style={styles.headerPage}>
              <Image source={{ uri: item.creator?.avatar }} style={styles.avatar} />
              <Text style={{ flex: 2, fontSize: 10, fontFamily, marginStart: 2 }}>
                {item.creator.name}
              </Text>
              <Text style={{ flex: 3, fontSize: 10, fontFamily, position: 'absolute', end: 5, top: 8, color:'black' }}>
                {getDateAndDay(item.createdAt)}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', height: '20%' }}>
          <Text style={{ position: 'absolute', color: 'black', fontFamily, top: 0, textAlign: 'justify' , fontSize:11 ,end:0, top:-5}}>
              {item.categories[0].name}
            </Text>
            <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode="cover" />
            <View style={styles.statsContainer}>
              <View style={styles.statsItem}>
                <ICON name='hearto' color={'black'} size={18} />
                <Text style={{ marginStart: 3, fontSize: 13, fontFamily }}>{formatNumber(item?.likes?.length)}</Text>
              </View>
              <View style={styles.statsItem}>
                <ICON name='eyeo' color={'black'} size={18} />
                <Text style={{ marginStart: 3, fontSize: 13, fontFamily }}>{formatNumber(item.reads)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.separator}>
          <Text style={{ fontFamily, color: 'black', fontSize: 8, overflow: 'hidden' }}>
            {'~'.repeat(150)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <FlatList
          data={data}
          renderItem={ItemNew}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
                refreshing={isRefreshing} // Trạng thái của RefreshControl
                onRefresh={onRefresh} // Gọi hàm khi làm mới
                colors={['#ff0000', '#00ff00', '#0000ff']} // Màu của spinner
            />
        }
        />
      </View>
    </View>
  );
};

export default TodayList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: 'column',
    marginBottom: 0
  },
  body: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom:180
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
    flexDirection: 'column'
  },
  image: {
    height: 100,
    width: 140,
    borderRadius: 3,
    marginTop:10
  },
  avatar: {
    height: 25,
    width: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray'
  },
  statsContainer: {
    height: 20,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
