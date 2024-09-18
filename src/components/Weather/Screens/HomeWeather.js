import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import SearchLocal from './SearchLocal';
import WeatherDay from './WeatherDay';
import { FONT, theme } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons';
import { fetchWeatherForecast } from '../WeatherAPI';
import { useFocusEffect } from '@react-navigation/native';
const width = Dimensions.get('window').width
const HomeWeather = () => {
  const [dayType, setDayType] = useState(3);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState(null); // Initialize as null
  const [currentLocation, setCurrentLocaition] = useState('Ho Chi Minh City');
  const { location, current, forecast } = weather || {}; // Default to empty object
  const [fontFamily, setFontFamily] = useState(FONT.primary);

  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  useEffect(() => {
    if (currentLocation) {
      fetchWeatherForecast({
        cityName: currentLocation,
        days: '7',
      }).then(data => {
        setCurrentLocaition('');
        setWeather(data);
      });
    }
  }, [currentLocation]); // Add currentLocation to dependency array
  useFocusEffect(
    useCallback(()=>{
      if (currentLocation) {
        fetchWeatherForecast({
          cityName: 'Ho Chi Minh City',
          days: '7',
        }).then(data => {
          setCurrentLocaition('');
          setWeather(data);
        });
      }
    },[])
  )

  const handlerKey = (loc) => {
    setLocations([]);
    setWeather(null); // Set weather to null while fetching new data
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handlerKey(item)}
    >
      <ICON name="location-outline" color={'black'} size={20} />
      <Text style={[styles.locationText1, { fontFamily: fontFamily }]}>
        {item.name}, {item.country}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {Array.isArray(locations) && locations.length > 0 ? (
        <View style={styles.locationList}>
          <FlatList
            style={styles.flatList}
            horizontal={false}
            data={locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a string
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : null}
      <Image
        source={require('../../../media/imgae/wt3.jpg')}
        style={styles.backgroundImage}
        blurRadius={30}
      />
      <View style={styles.search}>
        <SearchLocal locations={locations} setLocations={setLocations} />
      </View>
      <View style={styles.body}>
        <View style={styles.locationInfo}>
          <Text style={[styles.locationText, { fontFamily: fontFamily }]}>
            {location?.name}, {location?.country}
          </Text>
        </View>
        <View style={styles.weatherImage}>
          <Image
            source={{ uri: `https:${current?.condition?.icon}` }}
            style={styles.weatherIcon}
          />
        </View>
        <View style={styles.weatherDetails}>
          <Text style={[styles.temperature, { fontFamily: fontFamily }]}>{current?.temp_c}'C</Text>
          <Text style={[styles.weatherCondition, { fontFamily: fontFamily }]}>{current?.condition.text}</Text>
          <View style={styles.weatherStats}>
            <View style={styles.statItem}>
              <ICON name="leaf-outline" size={20} color={'white'} />
              <Text style={[styles.statText, { fontFamily: fontFamily }]}>{current?.wind_kph} km/hour</Text>
            </View>
            <View style={styles.statItem}>
              <ICON name="water-outline" size={20} color={'white'} />
              <Text style={[styles.statText, { fontFamily: fontFamily }]}>{current?.humidity} %</Text>
            </View>
            <View style={styles.statItem}>
              <ICON name="sunny-outline" size={20} color={'white'} />
              <Text style={[styles.statText, { fontFamily: fontFamily }]}>{current?.last_updated}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.weatherday}>
        <WeatherDay dataDay={forecast?.forecastday} />
      </View>
    </View>
  );
};


export default HomeWeather

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  locationList: {
    top: 80,
    position: 'absolute',
    height: 150,
    width: '90%',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.bgwhite(0.9),
    borderRadius: 20,
  },
  flatList: {
    width: '95%',
  },
  locationItem: {
    height: 36,
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginStart: 1,
    borderBottomColor: 'gray',
  },
  locationText: {
    fontFamily: FONT.primary,
    color: 'white',
    fontSize: 20,
  },
  locationText1: {
    fontFamily: FONT.primary,
    color: 'black',
    fontSize: 20,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  search: {
    flex: 1,
  },
  body: {
    flex: 4,
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  weatherImage: {
    flex: 4,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIcon: {
    height: '100%',
    width: '60%',
  },
  weatherDetails: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  temperature: {
    fontFamily: FONT.primary,
    fontSize: 40,
    color: 'white',
  },
  weatherCondition: {
    fontFamily: FONT.primary,
    fontSize: 20,
    color: 'white',
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    alignItems: 'center',
    marginTop: 20,

  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:12
  },
  statText: {
    fontFamily: FONT.primary,
    fontSize: 16,
    color: 'white',
  },
  weatherday: {
    flex: 2,
  },
});
