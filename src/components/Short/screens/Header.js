import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLOR, FONT } from '../../../constain/fontFamilies'
import { UserContext } from '../../user/UserContext';
import { useNavigation } from '@react-navigation/native';


const Header = ({ data }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigation()
  const [fontFamily, setFontFamily] = useState(FONT.primary);


  useEffect(() => {
    // Update font when FONT.primary changes
    setFontFamily(FONT.primary);
  }, [FONT.primary]);


  return (
    <View style={styles.container}>
      <Text style={[styles.type, { fontFamily: fontFamily }]}>{data.categories.name}</Text>
      {/* logo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={{ color: 'black', fontFamily: FONT.primary }}>
          <Text style={{ fontSize: 26, color: 'white', fontFamily: FONT.primary }}>N</Text>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: FONT.primary }}>EWSPANB</Text>
        </Text>
      </View>
      {user?.authenticated ?
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}
          onPress={() => {
            navigate.navigate('AddNewShort')
          }}
        >
          <Text style={{ fontFamily: FONT.primary, color: 'white', fontSize: 14, marginEnd: 10 }}>New</Text>
        </TouchableOpacity>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        </View>
      }

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    start: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    fontFamily: FONT.primary,
    fontSize: 14,
    color: COLOR.T,
    flex: 1,
    padding: 5
  }
})