import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { FONT, theme } from '../../../constain/fontFamilies'
import ICON from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native';
const WeatherDay = ({ dataDay }) => {
  const [value, setValue] = useState(3)

  const Item = ({ item }) => {
    let date = new Date(item.date);
    let options = { weekday: 'long' };
    let dayName = date.toLocaleDateString('en-US', options);
    dayName = dayName.split(',')[0];
    const [fontFamily, setFontFamily] = useState(FONT.primary);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFont = async () => {
        setFontFamily(FONT.primary);
      };

      fetchFont();
    }, []) // Chạy khi component được focus
  );
    return (
      <View style={styles.itemContainer}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: `https:${item?.day?.condition?.icon}` }} style={styles.weatherIcon} />
        </View>
        <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
          <Text  style={[styles.dayName, { fontFamily: fontFamily }]}>{dayName}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.temp, { fontFamily: fontFamily }]}>{item?.day?.maxtemp_c}'C</Text>
        </View>
      </View>
    )
  }

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.weatherList}>
        {dataDay?.map((item, index) => (
          <Item
            key={index}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default WeatherDay

const styles = StyleSheet.create({
  weatherList: {
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    height: 150,
    width: 100,
    borderRadius: 10,
    backgroundColor: theme.bgwhite(0.2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  weatherIcon: {
    height: 50,
    width: 40,
  },
  dayName: {
    fontFamily: FONT.primary,
    color: 'white',
    fontSize: 18,
  },
  temp: {
    fontFamily: FONT.primary,
    color: 'white',
    fontSize: 18,
  },
})
