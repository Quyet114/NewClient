import { View, Text, Pressable, ScrollView, FlatList, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { getNewsToday, getNewsMostRead } from '../newsHttp';
import { FONT } from '../../../constain/fontFamilies';
import MostRead from '../../HomeNew/MostRead';
import TodayList from '../../HomeNew/TodayList';
import { useFocusEffect } from '@react-navigation/native';
const Home = () => {
  const [newToday, setNewsToday] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchMostRead()
    fetchData();
  }, []);
  useFocusEffect(useCallback(() => {
    fetchData()
    fetchMostRead()
  }, [fetchData || fetchMostRead])
  )
  const fetchData = async () => {
    try {
      const response = await getNewsToday();
      setNewsToday(response);
      //console.log('News Today: ' , response);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchMostRead = async () => {
    try {
      const response = await getNewsMostRead();
      setMostRead(response);
      //console.log('News Today: ' , response);
    } catch (error) {
      console.log(error);
    }
  }
  const onRefresh = async () => {
    setIsRefreshing(true); // Bắt đầu hiển thị spinner làm mới
    await fetchData();
    await fetchMostRead();
    setIsRefreshing(false); // Kết thúc việc làm mới
  };
  return (
    <View

      style={{ height: '100%', width: '100%', backgroundColor: '#FFFFFF', }}
    >
      <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', }}>
        {/* Most Read */}
        <View style={{ width: '100%', height: 180, alignItems: 'center', justifyContent: 'space-between', }}>
          <View style={{ height: '18%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black', marginStart: 12 }}>Most read</Text>
            <TouchableOpacity>
              <Text style={{ fontFamily: FONT.primary, fontSize: 14, color: 'black', marginEnd: 5 }}>More...</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: '80%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <MostRead data={mostRead.posts} />
          </View>

        </View>
        {/* Today */}
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 12, borderColor: 'black', marginTop: 5, paddingBottom: 55 }}>
          <View style={{ height: 30, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: FONT.primary, fontSize: 22, color: 'black', marginStart: 12 }}>Recent</Text>
          </View>
          <View style={{ height: '100%'}}>
            <TodayList data={newToday.posts} onRefresh={onRefresh} isRefreshing={isRefreshing}/>
          </View>
        </View>
      </View>

    </View>

  )

}

export default Home
