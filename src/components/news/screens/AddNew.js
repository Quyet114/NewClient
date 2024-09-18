import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, ToastAndroid, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext,useEffect } from 'react'
import { launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import { upLoadImage } from '../newsHttp';
import { createNew } from '../newsHttp';
import { FONT } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Feather'
import ICONO from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../user/UserContext';
import { useNavigation } from '@react-navigation/native';
const AddNew = () => {
    const  navigation  = useNavigation()
    const [modelVisible, setModelVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [categories, setCategories] = useState('66b0d536a97eb67240712c41');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectIcon, setSelectIcon] = useState('earth-outline');
    const [selectedOption, setSelectedOption] = useState('Worlds');
    const { user } = useContext(UserContext);
    const creator = user._id;
    const [fontFamily, setFontFamily] = useState(FONT.primary);

    useEffect(() => {
      // Cập nhật font khi FONT.primary thay đổi
      setFontFamily(FONT.primary);
    }, [FONT.primary]);
    const options = [
        { label: 'Worlds', value: '66b0d536a97eb67240712c41', Icon: 'earth-outline' },
        { label: 'Sport', value: '66b0d536a97eb67240712c42', Icon: 'football-outline' },
        { label: 'Showbiz', value: '66b0d536a97eb67240712c45', Icon: 'musical-notes-outline' },
        { label: 'Law', value: '66b0d536a97eb67240712c44', Icon: 'school-outline' },
        { label: 'Cooking', value: '66b0d536a97eb67240712c46', Icon: 'restaurant-outline' },
        { label: 'Security', value: '66b0d536a97eb67240712c43', Icon: 'shield-outline' },

    ];
    const selectOption = (option) => {
        setSelectedOption(option.label);
        setDropdownVisible(false);
        setSelectIcon(option.Icon)
        setCategories(option.value)
    };
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    //Tắt mở Modal
    const OpenModal = () => {
        setModelVisible(true);
    };
    // Mở camera
    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchCamera(options, takePhoto);
    }, []);
    // Mở Library
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchImageLibrary(options, takePhoto);
    }, []);
    const generateRandomNumber = (length) => {
        return Math.floor(Math.random() * Math.pow(10, length));
    };
    const takePhoto = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setImage(asset.uri);
            setModelVisible(false);
            const randomNumber = generateRandomNumber(6);
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: `image-${randomNumber}-${asset.fileName}` || `image-${randomNumber}.jpg`,
            });
            const result = await upLoadImage(formData);
            console.log('>>>>>upload image: ', result);
            console.log('>>>>>upload image: ', result[0].url);
            setImagePath(result[0].url);

        }

    });
    const Publish = async () => {
        console.log('đây: ', creator, title, text, categories, imagePath);
        try {
            const result = await createNew(creator, title, text, categories, imagePath);
            if (result.status === 1) {
                ToastAndroid.show('Successfuly', ToastAndroid.SHORT)
                setImage(null);
                setText(null);
                setTitle(null);
                navigation.goBack();
            } else {
                ToastAndroid.show('Error', ToastAndroid.SHORT)
                console.log('Publish error: ', result);

            }
        } catch (error) {
            console.log('Publish error: ', error);
        }
    }
    return (
        <View style={{ backgroundColor: '#FFFFFF', height: '100%', width: '100%', alignItems: 'center' }}>

            <TouchableOpacity
                // mở Modal
                onPress={OpenModal}

                style={{ flex: 2, height: 183, width: 380, backgroundColor: '#EEF1F4', borderStyle: 'dashed', borderWidth: 2, borderColor: '#4E4B66', alignItems: 'center', justifyContent: 'center' }}>
                {image ? <Image style={{ height: '100%', width: '100%' }} source={{ uri: image }} /> :
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>+</Text>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>Add Cover Photo</Text>
                    </View>}
            </TouchableOpacity>
            <View style={{ height: '50%', width: 380, marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ height: 60, width: 380, borderBottomWidth: 1, }}>

                    <TextInput value={title} numberOfLines={2} onChangeText={setTitle} style={{ fontSize: 18, fontFamily: FONT.primary, textAlign: 'justify' }} placeholder='Title' placeholderTextColor={'black'}></TextInput>
                </View>
                <View style={{ height: 280, width: 380, }}>
                    <TextInput value={text} onChangeText={setText} placeholder='Content' placeholderTextColor={'black'} multiline
                        numberOfLines={5} style={{ width: '100%', height: 'auto', fontFamily: FONT.primary, textAlign: 'justify' }}></TextInput>
                </View>
            </View>
            <View style={{ heigh: 88, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, justifyContent: 'center' }}>
                <View style={{ width: '50%', flexDirection: 'row', marginStart: 15, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={styles.type}>
                        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                            <View style={styles.buttonType}>
                                <ICONO name={selectIcon} size={18} color={'black'} />
                                <Text style={styles.buttonText}>{selectedOption}</Text>
                            </View>

                        </TouchableOpacity>
                        {dropdownVisible && (
                            <ScrollView style={styles.dropdown}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => selectOption(option)}
                                    >
                                        <Text style={styles.optionText}>{option.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
                <View style={{ width: '50%', alignItems: 'flex-end', paddingEnd: 30, height: '80%', marginBottom: 5 }}>
                    <TouchableOpacity onPress={Publish} style={{ width: '50%', alignItems: 'center', backgroundColor: 'blue', height: 50, borderRadius: 10, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: FONT.primary }}>Publish</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal animationType='slide'
                transparent={true}
                visible={modelVisible}
                onRequestClose={() => {
                    setModelVisible(false);
                }}>
                <View style={{ justifyContent: 'flex-end', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 20 }}>
                    <View style={{ height: '30%', width: '100%', backgroundColor: '#F5F5F5', borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => {
                            setModelVisible(false)
                        }} style={{ alignItems: 'flex-end', height: 50, padding: 5 }}>
                            <ICON name="x" size={24} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                            <TouchableOpacity onPress={openCamera} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, padding: 25 }}>
                                <ICON name="camera" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openLibrary} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, padding: 25 }}>
                                <ICON name="image" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Album</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>


        </View>
    )
}

export default AddNew

const styles = StyleSheet.create({
    type: {
        width: '40%',
        zIndex: 999,
        flexDirection: 'row'
    },
    dropdownButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: FONT.primary,
        marginStart: 5
    },
    buttonType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    buttonTypeIcon: {
        height: 20,
        width: 20,
    },
    buttonTypeText: {
        height: 20,
        width: 20,
    },
    dropdown: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'absolute',
        width: 80,
        marginTop: -260
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    optionText: {
        color: 'black',
        fontFamily: FONT.primary,

    },
})