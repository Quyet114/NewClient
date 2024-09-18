import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, ToastAndroid, ScrollView, Dimensions } from 'react-native'
import React, { useState, useCallback, useContext, useRef, useEffect } from 'react'
import { launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import { upLoadImage } from '../../news/newsHttp';
import { createNew } from '../../Short/ShortHttp';
import { COLOR, FONT, theme } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Feather'
import ICONO from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../user/UserContext';
import { useNavigation } from '@react-navigation/native';
import Video, { VideoRef } from 'react-native-video';
import { assets } from '../../../../react-native.config';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const AddNewShort = ({ route }) => {
    const videoRef = useRef < VideoRef > (null);
    const navigation = useNavigation()
    const [modelVideoVisible, setModelVideoVisible] = useState(false);
    const [modelImageVisible, setModelImageVisible] = useState(false);
    // const [video, setVideo] = useState("file:///data/user/0/com.demoone/cache/rn_image_picker_lib_temp_7ee4d0a8-8174-4d23-8ef1-c63226416286.mp4");
    // const [videoPath, setVideoPath] = useState(' https://res.cloudinary.com/dyjxyz2jc/video/upload/v1725028989/demo1/zfedwp3vshxgx7rnytoy.mp4');

    const [video, setVideo] = useState(null);
    const [videoPath, setVideoPath] = useState(null);
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState(["https://res.cloudinary.com/dyjxyz2jc/image/upload/v1723992188/demo1/cvfhe7rzf6p4r16mpmgl.jpg",
        "https://res.cloudinary.com/dyjxyz2jc/image/upload/v1723992189/demo1/gjwny8slonmhhgombfti.jpg",
        "https://res.cloudinary.com/dyjxyz2jc/image/upload/v1723992189/demo1/gjwny8slonmhhgombfti.jpg"
    ]);
    //const [imagePath, setImagePath] = useState([])
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [categories, setCategories] = useState('66b0d536a97eb67240712c41');
    const [type, setType] = useState(0);
    const [music, setMusic] = useState()
    const clear = () => {
        setImagePath();
        setVideoPath();
        setTitle();
        setText();
        setType(0);
    }

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectIcon, setSelectIcon] = useState('earth-outline');
    const [selectedOption, setSelectedOption] = useState('Worlds');
    const [playingVideo, setPlayingVideo] = useState(null);
    const { user } = useContext(UserContext);
    const creator = user._id;
    const options = [
        { label: 'Worlds', value: '66b0d536a97eb67240712c41', Icon: 'earth-outline' },
        { label: 'Sport', value: '66b0d536a97eb67240712c42', Icon: 'football-outline' },
        { label: 'Showbiz', value: '66b0d536a97eb67240712c45', Icon: 'musical-notes-outline' },
        { label: 'Law', value: '66b0d536a97eb67240712c44', Icon: 'school-outline' },
        { label: 'Cooking', value: '66b0d536a97eb67240712c46', Icon: 'restaurant-outline' },
        { label: 'Security', value: '66b0d536a97eb67240712c43', Icon: 'shield-outline' },

    ];
    useEffect(() => {
        if (route.params?.music) {
            setMusic(route.params.music);
            // console.log('heeeee: ', route.params.music);

        }
    }, [route.params?.music]);
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
    const OpenModalVideo = () => {
        setModelVideoVisible(true);
        setType(1)
    };
    const OpenModalImage = () => {
        setModelImageVisible(true);
        setType(0)
    };
    const togglePlayVideo = (uri) => {
        setPlayingVideo(playingVideo === uri ? null : uri);
    };
    const deleteVideo = () => {
        setVideo(null);
        setVideoPath(null);
    }
    const deleteImageIndex = (item) => {
        const updatedImage = imagePath.filter((imagePath) => imagePath !== item);
        setImagePath(updatedImage);
        console.log(updatedImage);

    }
    // Mở camera
    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'video',
            quality: 1,
            saveToPhotos: true,
            selectionLimit: 1,
        };
        await launchCamera(options, takeVideo);
    }, []);
    // Mở Library
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'video',
            quality: 1,
            selectionLimit: 1,
        };
        await launchImageLibrary(options, takeVideo);
    }, []);
    const openCameraI = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 0,
        };
        await launchCamera(options, takePhoto);
    }, []);
    const openLibraryI = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 0,
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
            const asset = response.assets.map(assets => {
                const { type, fileName, uri } = assets
                return {
                    type,
                    fileName,
                    uri
                }
            });
            setImage(asset)
            console.log(asset);
            setModelImageVisible(false);
            const formData = new FormData();
            asset.forEach((data, index) => {
                formData.append('file', {
                    uri: data.uri,
                    type: data.type,
                    name: `photo-${index}-${data.fileName}` || `photo-${index}.jpg`,
                });
            });
            const result = await upLoadImage(formData);
            if (result) {
                const medias = result.map(item =>
                    item.url,
                );
                setImagePath(medias)
                console.log('ảnh nè: 0', medias);

            } else {
                console.error('uploadedMedias is not an array or is undefined');
            }
        }

    });
    const takeVideo = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setVideo(asset.uri);
            console.log(asset);

            setModelVideoVisible(false);
            const randomNumber = generateRandomNumber(6);
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: `video-${randomNumber}-${asset.fileName}` || `video-${randomNumber}.mp4`,
            });
            const result = await upLoadImage(formData);
            console.log('>>>>>upload image: ', result);
            console.log('>>>>>upload image: ', result[0].url);
            setVideoPath(result[0].url);

        }

    });
    const showImageOrVideo = () => {
        if (videoPath) {
            return (
                <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 5, backgroundColor: 'gray' }}>
                    <Video
                        source={{ uri: videoPath }}
                        // ref={videoRef}
                        resizeMode="contain"
                        style={styles.backgroundVideo}
                        paused={playingVideo !== videoPath}
                        repeat={true}

                    />
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => togglePlayVideo(videoPath)}
                    >
                        <Text style={styles.playButtonText}>
                            {playingVideo === videoPath ? <ICON name="pause-circle" size={24} color={'white'} /> : <ICON name="play-circle" size={24} color={'white'} />}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => deleteVideo()}
                    >
                        <Text style={styles.playButtonText}>
                            {videoPath ? <ICONO name="close-circle-outline" size={24} color={'black'} /> : null}
                        </Text>
                    </TouchableOpacity>
                </View>)
        } else if (imagePath?.length > 0) {
            return (
                <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                    {music ?
                        <>

                            <View style={{
                                backgroundColor: theme.bgblack(0.2), position: 'absolute', zIndex: 9999, alignItems: 'center',
                                justifyContent: 'center', height: 31, width: 220, flexDirection: 'row', borderRadius: 2, top: 20
                            }}
                            >
                                <ICON name='music' size={18} color={'black'} />
                                <Text style={{ fontFamily: FONT.primary, color: 'black', fontSize: 15, marginStart: 5 }}>{music.name}</Text>
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: theme.bgblack(0.2), position: 'absolute', zIndex: 9999, alignItems: 'center',
                                justifyContent: 'center', height: 31, width: 50, flexDirection: 'row', borderRadius: 2, top: 20, end:10
                            }}
                                onPress={() => {
                                    navigation.navigate('Songs')
                                }}
                            >
                                <Text style={{ fontFamily: FONT.primary, color: 'black', fontSize: 12, marginStart: 5 }}>Change</Text>
                            </TouchableOpacity>
                        </>

                        :

                        <TouchableOpacity style={{
                            backgroundColor: theme.bgblack(0.5), position: 'absolute', zIndex: 9999, alignItems: 'center',
                            justifyContent: 'center', height: 31, width: 120, flexDirection: 'row', borderRadius: 2, top: 20
                        }}
                            onPress={() => {
                                navigation.navigate('Songs')
                            }}
                        >
                            <ICON name='music' size={18} color={'white'} />
                            <Text style={{ fontFamily: FONT.primary, color: 'white', fontSize: 16, marginStart: 5 }}>Add sound</Text>
                        </TouchableOpacity>
                    }

                    <ScrollView horizontal contentContainerStyle={styles.weatherList}
                        showsHorizontalScrollIndicator={false}
                    >
                        {imagePath?.map((item, index) => (
                            <View style={styles.itemContainer} key={index}>
                                <Image source={{ uri: item }} style={{ height: '100%', width: '100%', borderRadius: 10, borderWidth: 1, borderColor: 'gray' }} />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 30,
                                        width: 30,
                                        position: 'absolute',
                                        backgroundColor: theme.bgwhite(0.2),
                                        top: 5,
                                        end: 10,
                                        borderRadius: 5
                                    }}
                                    onPress={() => deleteImageIndex(item)}
                                >
                                    <ICONO name="close-circle-outline" size={24} color={'black'} zIndex={999} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>)


        } else {
            return (<>
                <TouchableOpacity
                    onPress={OpenModalVideo}
                    style={{ flex: 1.5, width: width, backgroundColor: '#EEF1F4', borderStyle: 'dashed', borderWidth: 2, borderColor: '#4E4B66', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>+</Text>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>Add Video</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={OpenModalImage}
                    style={{ flex: 1.5, width: width, backgroundColor: '#EEF1F4', borderStyle: 'dashed', borderWidth: 2, borderColor: '#4E4B66', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>+</Text>
                        <Text style={{ color: 'black', fontFamily: FONT.primary }}>Add Images</Text>
                    </View>
                </TouchableOpacity>
            </>);
        }
    }
    const Publish = async () => {
        console.log('đây: ', 'user: ', creator, 'title: ', title, 'text: ', text, "categories: ", categories, 'video:', videoPath, 'images: ', imagePath, 'type: ', type , 'music', music._id);
        try {
            const body = {
                creator: creator,
                title: title,
                text: text,
                categories: categories,
                type: type,
                music: music._id
            };

            // Handle images and video
            if (imagePath && imagePath.length > 0) {
                body.images = imagePath; // imagePath should be an array of URLs
            } else if (videoPath) {
                body.images = [videoPath]; // videoPath should be a single URL wrapped in an array
            }

            const result = await createNew(body.creator, body.title, body.text, body.categories, body.images, body.type , body.music);
            if (result.status === 1) {
                ToastAndroid.show('Successfully Published', ToastAndroid.SHORT);
                clear();
                navigation.goBack();
            } else {
                ToastAndroid.show('Error occurred during publishing', ToastAndroid.SHORT);
                console.log('Publish error: ', result);
            }
        } catch (error) {
            console.log('Publish error: ', error);
        }
    };

    return (
        <View style={{ backgroundColor: '#FFFFFF', height: '100%', width: '100%', alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
                <View style={{ height: '100%', width: width }}>
                    {showImageOrVideo()}
                </View>

            </View>
            <View style={{ flex: 2, width: 380, marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ height: 60, width: 380, borderBottomWidth: 1, }}>

                    <TextInput value={title} numberOfLines={2} onChangeText={setTitle} style={{ fontSize: 18, fontFamily: FONT.primary, textAlign: 'justify' }} placeholder='Title' placeholderTextColor={'black'}></TextInput>
                </View>
                <View style={{ height: 280, width: 380, }}>
                    <TextInput value={text} onChangeText={setText} placeholder='Content' placeholderTextColor={'black'} multiline
                        numberOfLines={5} maxLength={300} style={{ width: '100%', height: 'auto', fontFamily: FONT.primary, textAlign: 'justify' }}></TextInput>
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
            {/* Video modal */}
            <Modal animationType='slide'
                transparent={true}
                visible={modelVideoVisible}
                onRequestClose={() => {
                    setModelVideoVisible(false);
                }}>
                <View style={{ justifyContent: 'flex-end', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 20 }}>
                    <View style={{ height: '30%', width: '100%', backgroundColor: '#F5F5F5', borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => {
                            setModelVideoVisible(false)
                        }} style={{ alignItems: 'flex-end', height: 50, padding: 5 }}>
                            <ICON name="x" size={24} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                            <TouchableOpacity onPress={openCamera} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, height: 120, width: 100, justifyContent: 'center' }}>
                                <ICON name="camera" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openLibrary} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, height: 120, width: 100, justifyContent: 'center' }}>
                                <ICON name="image" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Album</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
            {/* Image modal */}
            <Modal animationType='slide'
                transparent={true}
                visible={modelImageVisible}
                onRequestClose={() => {
                    setModelImageVisible(false);
                }}>
                <View style={{ justifyContent: 'flex-end', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 20 }}>
                    <View style={{ height: '30%', width: '100%', backgroundColor: '#F5F5F5', borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => {
                            setModelImageVisible(false)
                        }} style={{ alignItems: 'flex-end', height: 50, padding: 5 }}>
                            <ICON name="x" size={24} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                            <TouchableOpacity onPress={openCameraI} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, height: 120, width: 100, justifyContent: 'center' }}>
                                <ICON name="camera" size={34} color={'black'} />
                                <Text style={{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openLibraryI} style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 20, height: 120, width: 100, justifyContent: 'center' }}>
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

export default AddNewShort

const styles = StyleSheet.create({
    type: {
        width: '40%',
        zIndex: 999,
        flexDirection: 'row'
    },
    itemContainer: {
        height: 240,
        width: 160,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginHorizontal: 6,
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
    backgroundVideo: {
        width: '100%',
        height: '100%',
        paddingBottom: 40,
    },
    playButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        height: 40,
        width: 40,
        position: 'absolute',
        backgroundColor: theme.bgwhite(0.2)
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        position: 'absolute',
        backgroundColor: theme.bgwhite(0.2),
        top: 0,
        end: 20
    },
    playButtonText: {
        color: 'white',

    },
    weatherList: {
        justifyContent: 'space-around',
        height: '100%',
        alignItems: 'center'
    },
})