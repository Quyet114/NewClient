import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { COLOR, FONT } from '../../../constain/fontFamilies'
import { Image } from 'react-native';
import { DateOfTimePost, formatNumber } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getNewsByCategory, getTodayNewsByCategory, getTenReadNewsByCategory } from '../newsHttp';
import { useFocusEffect } from '@react-navigation/native';
import EmptyNews from '../../../constain/EmptyNews';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const MealNew = () => {
  const [worldNews, setWorldNews] = useState([]);
  const [todayWorldNews, setTodayWorldNews] = useState([]);
  const [topWorldNews, setTopWorldNews] = useState([]);
  const categoryId = "66b0d536a97eb67240712c46"
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    fetchAlNews();
    fetchWorlToday();
    fetchTenWorlToday();
  }, []);
  useFocusEffect(useCallback(() => {
    fetchAlNews();
    fetchWorlToday();
    fetchTenWorlToday();
  }, [fetchAlNews || fetchWorlToday || fetchTenWorlToday]));
  const onPressTab = (index) => {
    swiperRef.current?.scrollToIndex({ index });
    setActiveIndex(index);
  };
  const fetchWorlToday = async () => {
    try {
      const response = await getTodayNewsByCategory(categoryId);
      setTodayWorldNews(response);
      //console.log('World news: ', response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAlNews = async () => {
    try {
      const response = await getNewsByCategory(categoryId);
      setWorldNews(response);
      //console.log('World news: ', response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTenWorlToday = async () => {
    try {
      const response = await getTenReadNewsByCategory(categoryId);
      setTopWorldNews(response);
      //console.log('World news: ', response);
    } catch (error) {
      console.log(error);
    }
  };
  const ItemNew = ({ item }) => {
    return (
      <TouchableOpacity style={{ height: 170, flexDirection: 'column', marginBottom: 2, marginHorizontal: 6 }}
      onPress={() => navigation.navigate('NewDetail', { data: item })}
      >
        <View style={{ height: 160, flexDirection: 'row' }}>
          <View style={styles.headerContent}>
            <Text style={{ color: COLOR.D, fontSize: 17, marginBottom: 4, fontFamily: FONT.primary, fontWeight: '600' }} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
            <Text style={{ color: COLOR.D, fontSize: 10, fontFamily: FONT.primary, fontWeight: '600' }}>~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
            <Text style={{ color: COLOR.D, fontSize: 14, fontFamily: FONT.primary, fontWeight: "500" }} numberOfLines={4} ellipsizeMode="tail">
              {item.text}
            </Text>
            <View style={styles.headerPage}>
              <Image source={{ uri: item.creator?.avatar }} style={{ height: 30, width: 30, borderRadius: 3, borderWidth: 1, borderRadius: 30, borderColor: 'gray' }} />
              <Text style={{ flex: 2, fontSize: 16, fontFamily: FONT.primary, fontWeight: "500", marginStart: 10, color: 'black' }}>{item.creator.name}</Text>
              <Text style={{ flex: 3, fontSize: 12, fontFamily: FONT.primary, fontWeight: "500", position: 'absolute', end: 5, top: 15, color: 'black' }}>
                {DateOfTimePost(item.createdAt)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Image source={{ uri: item.images[0] }} style={{ height: 105, width: 140, borderRadius: 3 }} resizeMode="cover"
            />
            <View style={{ height: 20, width: 140, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>

              <View style={{ flexDirection: 'row', flex: 1.5, alignItems: 'center' }}>
                <ICON name='hearto' color={'black'} size={18} />
                <Text style={{ marginStart: 3, fontSize: 13, fontFamily: FONT.primary, color: 'black' }}>{formatNumber(item.likes.length)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ICON name='eyeo' color={'black'} size={18} style={{ flex: 1 }} />
                <Text style={{ marginStart: 3, fontSize: 13, flex: 2, fontFamily: FONT.primary, color: 'black' }}>{formatNumber(item.reads)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: FONT.primary, color: 'black', fontSize: 8, overflow: 'hidden' }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}
    >
      <View style={styles.header}>
        <Text style={{ fontFamily: FONT.primary, color: COLOR.D, fontSize: 24 }}>Food News</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => onPressTab(0)} style={[styles.tab, activeIndex === 0 && styles.activeTab]}>
            <Text style={[styles.tabText, activeIndex === 0 && styles.activeTabText]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressTab(1)} style={[styles.tab, activeIndex === 1 && styles.activeTab]}>
            <Text style={[styles.tabText, activeIndex === 1 && styles.activeTabText]}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressTab(2)} style={[styles.tab, activeIndex === 2 && styles.activeTab]}>
            <Text style={[styles.tabText, activeIndex === 2 && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SwiperFlatList
        ref={swiperRef}
        index={activeIndex}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        showPagination={false}
        style={styles.swiper}
      >
        {/* View 1 */}
        <View style={styles.body}>
          
          {todayWorldNews.length > 0 ?
            <FlatList
            data={todayWorldNews}
            renderItem={ItemNew}
            keyExtractor={(item) => item._id}
          />
            :
            <EmptyNews />
          }
          
        </View>
        {/* View 2 */}
        <View style={styles.body}>
          {topWorldNews.length > 0 ?
            <FlatList
              data={topWorldNews}
              renderItem={ItemNew}
              keyExtractor={(item) => item._id}
            />
            :
            <EmptyNews />
          }

        </View>
        {/* View 3 */}
        <View style={styles.body}>

          {worldNews.length > 0 ?
            <FlatList
              data={worldNews}
              renderItem={ItemNew}
              keyExtractor={(item) => item._id}
            />
            :
            <EmptyNews />
          }
        </View>
      </SwiperFlatList>


    </View>
  )
}

export default MealNew

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    marginVertical: 8,
    marginHorizontal: 6
  },
  headerTitle: {
    fontFamily: FONT.primary,
    color: COLOR.D,
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    marginRight: 20,
    paddingVertical: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLOR.D,
  },
  tabText: {
    fontSize: 16,
    fontFamily: FONT.primary,
    color: 'gray',
  },
  activeTabText: {
    color: COLOR.D,
  },
  swiper: {
    flex: 1,
    marginTop: 10,
    width: '100%'
  },
  body: {
    flex: 1,
    width: width
  },
  itemContainer: {
    height: 170,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 2,
  },
  itemContent: {
    height: 160,
    width: '100%',
    flexDirection: 'row',
  },
  headerContent: {
    flex: 5,
    marginEnd: 5,
    flexDirection: 'column',
  },
  itemTitle: {
    color: COLOR.D,
    fontSize: 17,
    marginBottom: 4,
    fontFamily: FONT.primary,
    fontWeight: '600',
  },
  itemText: {
    color: COLOR.D,
    fontSize: 14,
    fontFamily: FONT.primary,
    fontWeight: '500',
  },
  headerPage: {
    marginEnd: 5,
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
  },
  creatorName: {
    flex: 2,
    fontSize: 16,
    fontFamily: FONT.primary,
    fontWeight: '500',
    marginStart: 10,
  },
  createdAt: {
    flex: 3,
    fontSize: 12,
    fontFamily: FONT.primary,
    fontWeight: '500',
    position: 'absolute',
    end: 5,
    top: 7,
  },
  imageContainer: {
    flexDirection: 'column',
  },
  itemImage: {
    height: 100,
    width: 140,
    borderRadius: 3,
  },
  statsContainer: {
    height: 20,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconTextContainer: {
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'center',
  },
  iconText: {
    marginStart: 3,
    fontSize: 13,
    fontFamily: FONT.primary,
  },
  separatorContainer: {
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    fontFamily: FONT.primary,
    color: 'black',
    fontSize: 8,
    overflow: 'hidden',
  },
})


