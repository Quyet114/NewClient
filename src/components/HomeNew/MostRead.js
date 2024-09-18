import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONT, DateOfTimePost, getDateAndDay,formatNumber } from '../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
const { width } = Dimensions.get('window');

const MostRead = ({ data }) => {
  const navigation = useNavigation();
  const [fontFamily, setFontFamily] = useState(FONT.primary);

  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('NewDetail', { data: item })}
      >
        <View style={{
          flexDirection: 'row', borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          paddingVertical: 6,
          backgroundColor: '#FFFFF0',
          height: '100%',
          width: '98%'
        }}>
          <View style={styles.shadowContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          </View>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { fontFamily }]} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={[styles.description, { fontFamily }]} numberOfLines={5} ellipsizeMode="tail">
              {item.text}
            </Text>
            <View style={styles.headerPage}>
              <Image source={{ uri: item.creator.avatar }} style={styles.avatar} />
              <Text style={[styles.timeD, { fontFamily }]}>{getDateAndDay(item.createdAt)}</Text>
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <ICON name='message1' color={'black'} size={16} />
                <Text style={[styles.time, { fontFamily }]}>{formatNumber(item.comments.length)} </Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <ICON name='eyeo' color={'black'} size={16} />
                <Text style={[styles.time, { fontFamily }]}>{formatNumber(item.reads)} </Text>
              </View>
            </View>
          </View>
          <View style={{ position: 'absolute', padding: 2, backgroundColor: 'white', borderRadius: 2, marginStart: 3, marginTop: 2 }}>
            <Text style={[{ fontSize: 10, color: 'black' }, { fontFamily }]}>{item.categories[0].name}</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <SwiperFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        showPagination={false}
        paginationStyle={{ position: 'absolute', bottom: -20 }}
        paginationDefaultColor="gray"
        paginationActiveColor="blue"
        autoplay
        autoplayDelay={5} // Tự động trượt sau mỗi 5 giây
        autoplayLoop
        autoplayInvertDirection={false} // Trượt từ phải sang trái
      />
    </View>
  );
}

export default MostRead;

const styles = StyleSheet.create({
  headerContent: {
    flex: 5,
    marginStart: 5,
    height: '100%',
    flexDirection: 'column',
    marginEnd: 10,
    justifyContent:'space-around'
  },
  headerPage: {
    marginStart: 5,
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6
  },
  itemContainer: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '99%',
    width: '99%',
    borderRadius: 10
  },
  title: {
    fontSize: 17,
    overflow: 'hidden',
    color: 'black',
    textAlign: 'justify',
    marginBottom:8
  },
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'justify'
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  time: {
    color: 'black',
    fontSize: 14,
    marginStart:5
  },
  timeD: {
    flex: 3,
    color: 'black',
    fontSize: 10
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 3,
    marginStart: 5
  },
});
