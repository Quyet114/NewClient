import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ICON from 'react-native-vector-icons/AntDesign'
import  {FONT}  from '../../constain/fontFamilies';
const HomeDrawerHeader = ({ navigation, title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <ICON name='menu-fold' size={24} color={'black'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Bookmark')}>
                <ICON name='search1' size={24} color={'black'}/>
            </TouchableOpacity>
        </View>
    );
};

export default HomeDrawerHeader;