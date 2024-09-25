import {
  StyleSheet, Text, View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView, Dimensions
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { searchNews } from '../newsHttp';
import { FONT, COLOR, formatNumber, DateOfTimePost ,getDateAndDay} from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
const width = Dimensions.get('window').width;
const Bookmark = (props) => {
  const { navigation } = props
  const [news, setNews] = useState([]);
  const [keyword, setKeyWord] = useState('');
  const [tryAgain, setTryAgain] = useState(false);
  const fetchData = async (key) => {
    setKeyWord(key)
    try {
      const result = await searchNews(key)
      if (result) {
        setNews(result.data)
        setTryAgain(false);
      }
    } catch (error) {
      console.log('fetchData error: ', error);
      setTryAgain(true)
    }
  };

  const handlerTextDebounce = useCallback(
    debounce((text) => fetchData(text), 1200),
    []

  );
  const handlerItem = (item) => {
    setKeyWord('')
    setNews([])
    setTryAgain(false);
    navigation.navigate('NewDetail', { data: item })
  }
  const historyView = async () => {
    const history = await AsyncStorage.getItem('history');
    if (history.length > 0) {
      return (
        <View style={{ height: 100, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: 100, width: '100%', }}>
            <Text style={{ fontFamily: FONT.primary, color: 'black' }}>History</Text>
            <Text>ủa</Text>
          </View>
          <Text style={{ fontFamily: FONT.primary, color: 'back', fontSize: 18 }}>history</Text>
        </View>)
    } else {
      return (
        <View style={{ height: 100, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: 100, width: '100%', }}>
            <Text style={{ fontFamily: FONT.primary, color: 'black' }}>History</Text>
            <Text>ủa</Text>
          </View>
          <Text style={{ fontFamily: FONT.primary, color: 'back', fontSize: 18 }}>Empty history</Text>
        </View>)
    }

  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={[{
        height: 140, flexDirection: 'column', marginBottom: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFF0', borderRadius: 10
      }]}
        onPress={() => { handlerItem(item) }}

      >
        <View style={{ height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.headerContent}>
            <Text style={{ position: 'absolute', color: 'black', fontFamily: FONT.primary, height: 40, width: 80, top: -20 }}>{item.categories[0].name}</Text>
            <Text style={{ color: COLOR.D, fontSize: 15, marginBottom: 4, fontFamily: FONT.primary, textAlign: 'justify' }} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
            <Text style={{ color: COLOR.D, fontSize: 14, fontFamily: FONT.primary, textAlign: 'justify' }} numberOfLines={5} ellipsizeMode="tail">
              {item.text}
            </Text>
            <View style={styles.headerPage}>
              <Image source={{ uri: item.creator?.avatar }} style={[{ height: 25, width: 25, borderRadius: 3, borderWidth: 1, borderRadius: 30, borderColor: 'gray', marginStart: 5 }]} />
              <Text style={{ flex: 2, fontSize: 10, fontFamily: FONT.primary, fontWeight: "500", marginStart: 2 }}>{item.creator.name}</Text>
              <Text style={{ flex: 3, fontSize: 10, fontFamily: FONT.primary, fontWeight: "500", position: 'absolute', end: 5, top: 7 }}>{getDateAndDay(item.createdAt)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', height: '20%', marginTop: 5 }}>
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
                <Text style={{ marginStart: 3, fontSize: 13, flex: 2, fontFamily: FONT.primary }}>{formatNumber(item.reads)}</Text>
              </View>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
        {/* logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../media/imgae/new.png')} style={{ height: 50, width: 50 }} />
          <Text style={{ fontSize: 18, color: 'black', position: 'absolute', start: 15, bottom: 0 }}>
            <Text style={{ fontSize: 28, color: 'white', fontFamily: FONT.primary }}>N</Text>
            <Text style={{ fontSize: 18, color: 'black', fontFamily: FONT.primary }}>EWSPANB</Text>
          </Text>

        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search news'
            placeholderTextColor='black'
            onChangeText={handlerTextDebounce}

          />
          <ICON name='search1' size={24} color={'black'} style={styles.searchIcon} />
        </View>
      </View>
      <View style={{ marginTop: 16, marginBottom: 1, marginHorizontal: 8 }}>
        {news.length > 0 && keyword ?
          <FlatList
            style={{ marginBottom: 100 }}
            horizontal={false}
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} />
          :
          null
        }
        {tryAgain && <View>
          <Text style={{ fontSize: 16, color: 'black', fontFamily: FONT.primary }}>Try with other key words</Text>
        </View>}
      </View>

    </View>
  )

}

export default Bookmark

const styles = StyleSheet.create({
  timeLabel: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66',
    marginStart: 4
  },
  timeIcon: {
    width: 14,
    height: 14,
    marginStart: 12
  },
  bbcLabel: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66',
    marginStart: 4
  },
  bbcIcon: {
    width: 20,
    height: 20
  },
  cardNews: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardNewsContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleData: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000'
  },
  categoryData: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66'
  },
  contentData: {
    marginLeft: 4,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  imageData: {
    width: 96,
    height: 96,
    borderRadius: 6
  },
  itemData: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 8,
    justifyContent: 'flex-start'
  },
  filterIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 24,
    height: 24,
  },
  searchInput: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#4e4b66',
    paddingStart: 40,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000',
    fontFamily: FONT.primary
  },
  searchInputContainer: {
    position: 'relative'
  },
  searchContainer: {
    marginTop: 16,
    marginHorizontal: 12
  },
  bookmark: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0.12,
    color: '#000'
  },
  cl000: {
    color: '#000'
  },
  cl4e4b66: {
    color: '#4e4b66'
  },
  container: {
    backgroundColor: '#fff',
    width: width,
    height: '100%'
  },
  headerContent: {
    flex: 5,
    marginEnd: 5,
    height: '80%',
    flexDirection: 'column'
  },
  headerPage: {
    marginEnd: 5,
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
})
