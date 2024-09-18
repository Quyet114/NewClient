import { StyleSheet, Text, View, Dimensions, Image, Switch, TouchableOpacity, ToastAndroid ,Alert} from 'react-native'
import React, { useState, useContext } from 'react'
import { logout } from '../UserHttp';
import { UserContext } from '../UserContext';
import { FONT } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons';
import ICONF from 'react-native-vector-icons/FontAwesome'

const windowWith = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Setting = (props) => {
    const  navigation  = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { user, setUser } = useContext(UserContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const options = [
        { label: 'CaveatBrush-Regular', value: 1 },
        { label: 'Dosis-Bold', value: 2 },
        { label: 'Dosis-SemiBold', value: 3 },
        { label: 'KaushanScript-Regular', value: 4 },
        { label: 'Matemasie-Regular', value: 5 },
        { label: 'PermanentMarker-Regular', value: 6 },
        { label: 'Roboto', value: 7 }
    ];
    const handeLogout = () => {
            if(user){
                ToastAndroid.show("Logout Succesfuly", ToastAndroid.SHORT)
                setUser();
                navigation.navigate('Login');
                AsyncStorage.clear();
            }else{
                ToastAndroid.show("Empty User", ToastAndroid.SHORT)

            }

    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectOption = async (option) => {
        await AsyncStorage.setItem('selectedFont', option.label)
        setDropdownVisible(false);
        Alert.alert('Saved! restart to update font')
    };

    return (
        <View style={{ width: windowWith - 40, marginStart: 20, height: '100%', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                <ICON name="checkmark-circle-outline" size={24} color={'black'}/>
                    <Text style={{ fontSize: 16,  color: 'black', fontFamily:FONT.primary , marginStart:5}}>Verification</Text>
                </View>
                <ICON name="chevron-forward-outline" size={18} color={'black'}/>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, marginBottom: 20 }}
            onPress={toggleDropdown}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                    <ICONF name="font" size={24} color={'black'}/>
                    <Text style={{ fontSize: 16,   color: 'black', fontFamily:FONT.primary, marginStart:5  }}>Fonts</Text>
                </View>
                <ICON name="chevron-down" size={18} color={'black'}/>
            </TouchableOpacity>
            {dropdownVisible && (
                    <View style={styles.dropdown}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownOption}
                                onPress={() => selectOption(option)}
                            >
                                <Text style={{fontFamily:option.label, color:'black'}}>Font :  {option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, marginBottom: 20 }}
            
            onPress={() => navigation.navigate('EditProfile')}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                <ICON name="person-outline" size={24} color={'black'}/>
                    <Text style={{ fontSize: 16,  color: 'black', fontFamily:FONT.primary , marginStart:5 }}>Information</Text>
                </View>
                <ICON name="chevron-forward-outline" size={18} color={'black'}/>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                <ICON name="moon-outline" size={24} color={'black'}/>
                    <Text style={{ fontSize: 16,  color: 'black', fontFamily:FONT.primary, marginStart:5  }}>Dark Mode</Text>
                </View>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, marginBottom: 20 }}>
                <TouchableOpacity
                    onPress={handeLogout}

                    style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                    <ICON name="exit-outline" size={24} color={'black'}/>
                    <Text style={{ fontSize: 16,  color: 'black', fontFamily:FONT.primary, marginStart:5  }}>Logout</Text>
                </TouchableOpacity>
                <Text></Text>
            </View>


        </View>
    )
}

export default Setting

const styles = StyleSheet.create({

    dropdown: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position:'absolute',
        width:windowWith-40,
        marginTop:100,
        zIndex:999
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    optionText: {
        color: '#333',
    },
})