import {
  StyleSheet, Text, View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView, Dimensions,
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FONT, COLOR, formatNumber, convertNumToTime, getDateAndDay } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { getAllMusic, searchMusic, upLoadMusic } from '../MusicHttp'
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { getToken } from '../../../helper/AsyncStorageHelper';
import AddSong from './AddSong';
const width = Dimensions.get('window').width;
const Songs = (props) => {
  const { navigation } = props
  const [songs, setSongs] = useState();
  const [keyword, setKeyWord] = useState('');
  const [tryAgain, setTryAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentSound, setCurrentSound] = useState(null); // Âm thanh hiện tại
  const [currentItem, setCurrentItem] = useState(null);   // Item hiện tại đang phát
  const [duration, setDuration] = useState(0);            // Thời lượng âm thanh
  const [currentTime, setCurrentTime] = useState(0);      // Thời gian phát hiện tại
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState('')
  const [modelVisible, setModelVisible] = useState(false)

  const soundRef = useRef(null);

  const playSound = (item) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      setIsPlaying(false);
    }
    if (currentSound) {
      currentSound.stop();
      setIsPlaying(false);
    }
    const sound = new Sound(item.url, null, (error) => {
      if (error) {
        console.log('Không thể tải âm thanh:', error);
        return;
      }
      setDuration(sound.getDuration());
      setCurrentSound(sound);
      setCurrentItem(item);
      sound.play((success) => {
        if (success) {
          console.log('Phát xong âm thanh');
          setIsPlaying(false);
          setCurrentTime(0);
        } else {
          console.log('Phát âm thanh thất bại');
        }
      });

      setIsPlaying(true);
    });
  };

  const pauseSound = () => {
    if (currentSound) {
      currentSound.pause();
      setIsPlaying(false);
    }

    console.log('click');

  };


  const onSliderValueChange = (value) => {
    if (currentSound) {
      const newTime = value * duration;
      currentSound.setCurrentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSound && isPlaying) {
        currentSound.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSound]);


  const fetchData = async (key) => {
    setKeyWord(key)
    try {
      const result = await searchMusic(key)
      if (result) {
        setSongs(result.music)
        console.log('search music', result);

        setTryAgain(false);
      }
    } catch (error) {
      console.log('fetchData error: ', error);
      setTryAgain(true)
    }
  };

  const handlerTextDebounce = useCallback(
    debounce((text) => fetchData(text), 1200),
    []
  );
  const fetchAll = async () => {
    try {
      const result = await getAllMusic()
      if (result) {
        setSongs(result.music)
        console.log(result);

      }
    } catch (error) {
      console.log('fetchData error: ', error);
    }
  };
  const handlerItem = (item) => {
    // setKeyWord('')
    // setSongs([])
    // setTryAgain(false);
  }
  useEffect(() => {
    fetchAll()
  }, []);

  const chooseMussic = (item) => {
    navigation.navigate('AddNewShort', { music: item });
  }

  const openLibrary = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio], // Only allow audio files
      });
      if (response) {
        setIsLoading(true)
        takeMusic(response);
        console.log('picked', response);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error while picking file: ', err);
      }
    }
  }, [takeMusic]);
  
  const takeMusic = useCallback(async (response) => {
    if (!response || response.length === 0) return;
  
    const asset = response[0]; // Access the first picked file
  
    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri, // Use asset.uri directly from the response
      type: asset.type || 'audio/mpeg', // Use the audio file type
      name: asset.name || `music-${asset.name}.mp3`, // Name based on file name or fallback
    });
  
    try {
      const result = await upLoadMusic(formData);
      console.log('>>>>>upload music: ', result);
      console.log('>>>>>uploaded music URL: ', result[0].url);
      setMusicUrl(result[0].url)
      setModelVisible(true)
      if(result){
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error uploading music:', error);
    }
  }, []);
  
  // {
  //   "url": "https://res.cloudinary.com/dyjxyz2jc/video/upload/v1726503608/music/d0bluw0hzmhfhpmlnmt8.mp3",
  //   "filename": "music/d0bluw0hzmhfhpmlnmt8"
  // }
  const renderItem = ({ item }) => {
    return (
      <View style={[{
        height: 80, flexDirection: 'column', marginBottom: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFF0', borderRadius: 10
      }]}
        onPress={() => { handlerItem(item) }}

      >
        <View style={{ height: '50%', width: '100%', flexDirection: 'row', justifyContent: 'center', marginStart: 5 }}>
          <View style={styles.headerContent}>
            <Text style={{ color: COLOR.D, fontSize: 14, marginBottom: 1, fontFamily: FONT.primary, textAlign: 'justify', marginTop: 2 }} numberOfLines={1} ellipsizeMode="tail" >{item.name}</Text>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <ICON name='heart' color={'red'} size={16} />
              <Text style={{ fontSize: 11, fontFamily: FONT.primary, marginStart: 10, color: 'black' }}>{item.used}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ height: 50, width: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginTop: 5 }}>
              <Text style={{ flex: 1, fontSize: 10, fontFamily: FONT.primary, color: 'black' }}>{getDateAndDay(item.createdAt)}</Text>
              <View style={styles.headerPage}>
                <Image source={{ uri: item.creator?.avatar }} style={[{ height: 20, width: 20, borderRadius: 3, borderWidth: 1, borderRadius: 30, borderColor: 'gray' }]} />
                <Text style={{ flex: 1, fontSize: 11, fontFamily: FONT.primary, marginStart: 10 }}>{item.creator.name}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => chooseMussic(item)}
            style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', end: 8, top: 5 }}  >
            <ICON name='pluscircleo' size={18} color={'blue'} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', height: '50%', marginTop: 5, width: '100%' }}>
          <View style={{ flexDirection: 'row', marginStart: 5 }}>
            {isPlaying && currentItem?._id === item._id ?
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '80%' }}>
                <Text
                  style={{ fontSize: 12, fontFamily: FONT.primary, }}
                >{convertNumToTime(Math.floor(currentTime))}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={currentTime / duration}
                  onValueChange={onSliderValueChange}
                />
                <Text
                  style={{ fontSize: 12, fontFamily: FONT.primary, }}
                >{convertNumToTime(Math.floor(duration))}</Text>
              </View>

              :
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '80%' }}>
                <Text
                  style={{ fontSize: 12, fontFamily: FONT.primary, }}
                >00 : 00</Text>
                <Slider
                  style={styles.slider}
                />
                <Text
                  style={{ fontSize: 12, fontFamily: FONT.primary, }}
                >00 : 00</Text>
              </View>

            }
            <View style={styles.controls}>
              {isPlaying && currentItem?._id === item._id ?
                <TouchableOpacity onPress={() => pauseSound()}
                  style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}  >
                  <ICON name='playcircleo' size={18} color={'black'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => playSound(item)}
                  style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }} >
                  <ICON name='minuscircleo' size={18} color={'black'} />
                </TouchableOpacity>
              }


            </View>
          </View>
        </View>

      </View>
    )
  }
  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search'
            placeholderTextColor='black'
            onChangeText={handlerTextDebounce}

          />
          <ICON name='search1' size={24} color={'black'} style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={{ height: 48, width: 80, borderWidth: 1, borderColor: 'gray', flex: 1.5, marginStart: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
         onPress={openLibrary}
        >
          <ICON name='addfile' size={20} color={'black'} style={{}} />
          <Text style={{
            fontSize: 14,color: '#000',fontFamily: FONT.primary, marginStart:3
          }}>Song</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 16, marginBottom: 1, marginHorizontal: 8 }}>
        {songs?.length > 0 ?
          <FlatList
            style={{ marginBottom: 100 }}
            horizontal={false}
            data={songs}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} />
          :
          null
        }
        {tryAgain && <View>
          <Text style={{ fontSize: 16, color: 'black', fontFamily: FONT.primary }}>Try with other key words</Text>
        </View>}
      </View>
      <AddSong modelVisible={modelVisible} setModelVisible={setModelVisible} musicUrl={musicUrl}  setMusicUrl={setMusicUrl}/>
    </View>
  )

}

export default Songs

const styles = StyleSheet.create({
  timeLabel: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66',
    marginStart: 4
  },
  slider: {
    flex: 5,
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    zIndex: 9999
  },
  timeIcon: {
    width: 14,
    height: 14,
    marginStart: 12
  },
  bbcLabel: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66',
    marginStart: 4
  },
  bbcIcon: {
    width: 20,
    height: 20
  },
  cardNews: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardNewsContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleData: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000'
  },
  categoryData: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66'
  },
  contentData: {
    marginLeft: 4,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  imageData: {
    width: 96,
    height: 96,
    borderRadius: 6
  },
  itemData: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 8,
    justifyContent: 'flex-start'
  },
  filterIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 24,
    height: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 24,
    height: 24,
  },
  searchInput: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#4e4b66',
    paddingStart: 40,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000',
    fontFamily: FONT.primary,

  },
  searchInputContainer: {
    position: 'relative',
    flex: 6

  },
  searchContainer: {
    marginTop: 16,
    marginHorizontal: 12,
    flexDirection: 'row'
  },
  bookmark: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0.12,
    color: '#000'
  },
  cl000: {
    color: '#000'
  },
  cl4e4b66: {
    color: '#4e4b66'
  },
  container: {
    backgroundColor: '#fff',
    width: width,
    height: '100%'
  },
  headerContent: {
    flex: 5,
    marginEnd: 5,
    flexDirection: 'column'
  },
  headerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
})
