import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import React, { useRef, useState, useEffect, useCallback, memo, useContext } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Acctions from '../../Short/screens/Acctions';
import Tittle from '../../Short/screens/Tittle';
import Header from '../../Short/screens/Header';
import { FONT } from '../../../constain/fontFamilies';
import { getTenShorts } from '../../Short/ShortHttp'
import ShowImages from '../../Short/screens/ShowImages';
import ShowVideo from '../../Short/screens/ShowVideo';
import { UserContext } from '../UserContext';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const ShortsOfUser = ({ route }) => {
  const videoRef = useRef < VideoRef > (null);
  const { index, dataShort } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const user = useContext(UserContext);
  const {reloadUserData}  = useContext(UserContext);
  const handleChangeIndex = useCallback(({ index }) => {
    console.log('Current index:', index);
    setCurrentIndex(index);
  }, []);
  console.log('Current index:', index);
  useEffect(() => {
      const fetchUser = async () => {
        await reloadUserData(user.user._id);
      }
      fetchUser()
    }, [currentIndex])
  const RenderItem = memo(({ item, index }) => {
    return (
      <View style={styles.videoContainer}>
        {item.type === 0 ?
          <View style={{ height: '100%', width: '100%' }}>
            <ShowVideo
              data={item}
              isFocused={index === currentIndex}
            />
          </View>
          :
          <View style={{ height: '100%', width: '100%' }}>
            <ShowImages
              data={item}
              isFocused={index === currentIndex}
            />
          </View>
        }
        <Header data={item} />
        <Acctions data={item} 
        isFocused={index === currentIndex}
        />
        <Tittle data={item} />
      </View>
    );
  });
  const renderItem = useCallback(({ item, index }) => {
    return <RenderItem item={item} index={index} />;
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <SwiperFlatList
        vertical={true}
        data={dataShort}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showPagination={false}
        onChangeIndex={handleChangeIndex}
        initialIndex={index} 
        index={index}

      />
    </View>
  )
}

export default ShortsOfUser

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  videoContainer: {
    width: width,
    height: height,
    backgroundColor: 'black'
  },
  backgroundVideo: {
    width: '100%',
    height: '90%',
    paddingBottom: 40
  },
  imageContainer: {
    width: width,
    height: '100%',
    paddingBottom: 40
  },
  image: {
    width: width,
    height: '90%',
  },
  buttonDeleteImage: {
    height: 38,
    width: 38,
    position: 'absolute',
    end: 5,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 230,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
})
