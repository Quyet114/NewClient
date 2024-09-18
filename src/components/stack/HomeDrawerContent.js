// CustomDrawerContent.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FONT } from '../../constain/fontFamilies';

const HomeDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        {/* logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../media/imgae/new.png')} style={{ height: 50, width: 50 }} />
          <Text style={{ fontSize: 18, color: 'black', position: 'absolute', start: 15, bottom: 0 }}>
            <Text style={{ fontSize: 28, color: 'white', fontFamily:FONT.primary}}>N</Text>
            <Text style={{ fontSize: 18, color: 'black',  fontFamily:FONT.primary }}>EWSPANB</Text>
          </Text>

        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontFamily: FONT.primary }} />
      <DrawerItem
        label="Logout"
        onPress={() => console.log('Logout pressed')}
        labelStyle={{ fontFamily: FONT.primary, fontSize:20 }}
      />
    </DrawerContentScrollView>
  );
};

export default HomeDrawerContent;
