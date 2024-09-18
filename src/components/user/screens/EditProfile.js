import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput,  Modal, ToastAndroid } from 'react-native'
import React, {useEffect, useContext, useState, useCallback } from 'react'
import { UserContext } from '../UserContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { upLoadAvatar } from '../UserHttp';
import { updateUser } from '../UserHttp';
import ICON from 'react-native-vector-icons/AntDesign';
import ICONO from 'react-native-vector-icons/Feather'
import { FONT, getDateAndDay } from '../../../constain/fontFamilies';
const windowWith = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditProfile = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { navigation } = props
    const [modelVisible, setModelVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(user.name);
    const [id, setId] = useState(user._id);
    const [email, setEmail] = useState(user.email)
    const [about, setAbout] = useState(user.about);
    const [createdAt, setCreatAt] = useState(user.createdAt)
    const [dob, setDob] = useState('1998-03-05')
    const [imagePath, setImagePath] = useState(user.avatar);
    const [imageNew, setImageNew] = useState(null);
    const [fontFamily, setFontFamily] = useState(FONT.primary);

    useEffect(() => {
        setFontFamily(FONT.primary);
    }, [FONT.primary]);
    //mở Modal
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

    },[]);
    const Publish = async () => {
        try {
            await updateUser(id, username, email, about, imagePath);
            ToastAndroid.show('Successfuly', ToastAndroid.SHORT)
            //reloadUserData(id);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <View style={{ width: windowWith - 40, marginStart: 20, backgroundColor: 'white', height: '100%' }}>

                <View style={{ justifyContent: 'center', flexDirection: 'row', height: '26%', alignItems: 'center' }}>
                    <View style={{ height: 140, width: 140, borderRadius: 240 }} >
                        {user.avatar ? <Image source={{ uri: imagePath }} style={{ height: '100%', width: '100%', borderRadius: 240, backgroundColor: 'gray', borderWidth: 1, borderColor: 'gray' }} /> : null}
                    </View>
                    <TouchableOpacity
                        onPress={OpenModal}
                        style={{ position: 'absolute', bottom: 20, start: 190, height: 20, width: 20 }}>
                        <View style={{ backgroundColor: '#FFFFF0', alignItems: 'center', justifyContent: 'center', height: 40, width: 40, borderRadius: 50 }}>
                            <ICON name='camerao' size={20} color={'black'} />
                        </View>
                    </TouchableOpacity>
                </View >
                <View style={{ justifyContent: 'space-between', flexDirection: 'column', height: '60%', alignItems: 'center', width: '100%', }}>

                    <View style={{ width: '100%' }}>
                        <Text style={[{ color: 'black', fontSize: 14 }, { fontFamily: fontFamily }]}>Email Address</Text>
                        <Text style={[{ height: 20 }, { fontFamily: fontFamily }]} >{email}</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={[{ color: 'black', fontSize: 14 }, { fontFamily: fontFamily }]}>Created at</Text>
                        <Text style={[{ height: 20 }, { fontFamily: fontFamily }]}>{getDateAndDay(createdAt)}  </Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={[{ color: 'black', fontSize: 14 }, { fontFamily: fontFamily }]}>Verification</Text>
                        {user.vetify ?
                            <ICON name='checkcircleo' color={'green'} size={16} style={{ marginStart: 20 }} />
                            :
                            <ICON name='closecircleo' color={'green'} size={16} style={{ marginStart: 20 }} />
                        }
                    </View>
                    <ICON name='edit' color={'black'} size={22} style={{ }} />
                    <View style={{ width: '100%' }}>
                        <Text style={[{ color: 'black', fontSize: 14 }, { fontFamily: fontFamily }]}>user name</Text>
                        <TextInput value={name} onChangeText={(text) => setName(text)} style={{ borderWidth: 1, height: 40, width: '100%', borderRadius: 5 }} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={[{ color: 'black', fontSize: 14 }, { fontFamily: fontFamily }]}>About</Text>
                        <TextInput placeholder='Write something about you...!' multiline={true} numberOfLines={5} value={about} onChangeText={setAbout} style={{ borderWidth: 1, height: 120, width: '100%', borderRadius: 5 }} />
                    </View>
                    <View></View>
                    <View></View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '10%', marginTop: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={Publish} style={{width:'100%', height:'75%', backgroundColor:'#FFFFF0', borderWidth:1, borderColor:'gray', borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                        <Text style={[{ color: 'black', fontSize: 20 }, { fontFamily: fontFamily }]} >Update</Text>
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
                            <ICONO name="x" size={24} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                            <TouchableOpacity onPress={openCamera} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, padding: 25 }}>
                                <ICONO name="camera" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openLibrary} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, padding: 25 }}>
                                <ICONO name="image" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Album</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({})