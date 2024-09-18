import {
  StyleSheet, Text, View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView, Dimensions
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { FONT } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../constain/fontFamilies';
import { debounce } from 'lodash'
import { fetchWeatherLocaitions } from '../WeatherAPI';
const width = Dimensions.get('window').width
const SearchLocal = ({locations, setLocations}) => {
  const [text, setText] = useState([]);
  const [listKey, setListKey] = useState([]);
  const [keyword, setKeyword] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const location = [{"country": "Vietnam", "id": 2718001, "lat": 18.33, "lon": 105.9, "name": "Ha Tinh", "region": "", "url": "ha-tinh-vietnam"}]
  const [fontFamily, setFontFamily] = useState(FONT.primary);

  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  const onSearch = value => {
    if(value.length>3){
      setText(value);
      fetchWeatherLocaitions({cityName:value}).then(data=>{
        console.log('got location: ', data);
        setLocations(data);
      })
    }
  };

  const handlerTextDebounch = useCallback(debounce(onSearch, 1200), [])
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginHorizontal: 8, marginBottom: 5 }}>
        {/* logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../media/imgae/new.png')} style={{ height: 50, width: 50, backgroundColor:'white', borderRadius: 20 }} />
          <Text style={{ fontSize: 18, color: 'black', position: 'absolute', start: 3, bottom: 0 }}>
            <Text  style={[{fontSize: 30, color: 'black', }, { fontFamily: fontFamily }]}>N</Text>
            <Text  style={[{fontSize: 16, color: 'black', }, { fontFamily: fontFamily }]}>EWS</Text>
            <Text  style={[{fontSize: 16, color: 'black', }, { fontFamily: fontFamily }]}>PANB</Text>
          </Text>
         
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { fontFamily: fontFamily }]}
          placeholder='Search city'
          placeholderTextColor='white' 
          onChangeText={handlerTextDebounch}
        />
        <View style={styles.searchIcon}>
          <ICON name='search1' size={24} color={'white'} />
        </View>

      </View>


    </View >
  )
}

export default SearchLocal

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    end: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    backgroundColor: theme.bgwhite(0.2),
    padding: 3,
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  searchInput: {
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: theme.bgwhite(0.2),
    borderColor: '#4e4b66',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: 'white',
    fontFamily: FONT.primary,
    paddingHorizontal: 15,

  },
  searchInputContainer: {
  },
  searchContainer: {
    flex: 3,
    marginHorizontal: 8,
    justifyContent: 'center',

  },
  container: {
    width: width,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',

  }
})
const provinces = [
  'An Giang, Vietnam', 'Ba Ria - Vung Tau, Vietnam', 'Bac Lieu, Vietnam', 'Bac Kan, Vietnam', 'Bac Giang, Vietnam',
  'Bac Ninh, Vietnam', 'Ben Tre, Vietnam', 'Binh Duong, Vietnam', 'Binh Dinh, Vietnam', 'Binh Phuoc, Vietnam',
  'Binh Thuan, Vietnam', 'Ca Mau, Vietnam', 'Cao Bang, Vietnam', 'Can Tho, Vietnam', 'Da Nang, Vietnam', 'Dak Lak, Vietnam',
  'Dak Nong, Vietnam', 'Dien Bien, Vietnam', 'Dong Nai, Vietnam', 'Dong Thap, Vietnam', 'Gia Lai, Vietnam', 'Ha Giang, Vietnam',
  'Ha Nam, Vietnam', 'Hanoi, Vietnam', 'Ha Tinh, Vietnam', 'Hai Duong, Vietnam', 'Hai Phong, Vietnam', 'Hau Giang, Vietnam',
  'Hoa Binh, Vietnam', 'Ho Chi Minh City, Vietnam', 'Hung Yen, Vietnam', 'Khanh Hoa, Vietnam', 'Kien Giang, Vietnam', 'Kon Tum, Vietnam',
  'Lai Chau, Vietnam', 'Lang Son, Vietnam', 'Lao Cai, Vietnam', 'Lam Dong, Vietnam', 'Long An, Vietnam', 'Nam Dinh, Vietnam',
  'Nghe An, Vietnam', 'Ninh Binh, Vietnam', 'Ninh Thuan, Vietnam', 'Phu Tho, Vietnam', 'Phu Yen, Vietnam', 'Quang Binh, Vietnam',
  'Quang Nam, Vietnam', 'Quang Ngai, Vietnam', 'Quang Ninh, Vietnam', 'Quang Tri, Vietnam', 'Soc Trang, Vietnam',
  'Son La, Vietnam', 'Tay Ninh, Vietnam', 'Thai Binh, Vietnam', 'Thai Nguyen, Vietnam', 'Thanh Hoa, Vietnam',
  'Thua Thien Hue, Vietnam', 'Tien Giang, Vietnam', 'Tra Vinh, Vietnam', 'Tuyen Quang, Vietnam', 'Vinh Long, Vietnam',
  'Vinh Phuc, Vietnam', 'Yen Bai, Vietnam'
];

