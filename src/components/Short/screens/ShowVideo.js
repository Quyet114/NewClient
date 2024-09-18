import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import Video, { VideoRef } from 'react-native-video';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { COLOR, FONT, theme } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Feather'
import { updateReadCount } from './../ShortHttp';
import { UserContext } from '../../user/UserContext';
import { getShortCmt } from '../../news/newsHttp';
const ShowVideo = ({ data, isFocused }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const user = useContext(UserContext);
  const ref = useRef(null);
  useEffect(() => {
    if (isFocused) {
      setIsPlaying(true); // Auto-play video when focused
      const timer = setTimeout(() => {
        updateRead(data._id)
      }, 5000);
      return () => clearTimeout(timer);

    } else {
      setIsPlaying(false); // Pause video when not focused
    }
  }, [isFocused == true]);
  const updateRead = async (shortId) => {
    const resutl = await updateReadCount(shortId);
    if (resutl.status === 1) {
      console.log('updated: ', shortId);

    }
  }
  const togglePlayVideo = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => togglePlayVideo()}
      >
        <Video
          source={{ uri: data.images[0] }}
          ref={ref}
          resizeMode="contain"
          style={styles.backgroundVideo}
          repeat
          controls={false}
          paused={!isPlaying}

        />
        <View style={styles.playButtonText}>
          {isPlaying ? null : <ICON name="play-circle" size={40} color={'white'} />}
        </View>
      </TouchableOpacity>
    </View>

  )
}

export default ShowVideo

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    paddingBottom: 80,
    backgroundColor: 'black',
    marginBottom: 50
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
    height: 50,
    width: 50,
    position: 'absolute',
    start: width / 2
  },
})