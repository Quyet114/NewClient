import { StyleSheet, Text, View, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect, useCallback, memo, useContext } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Acctions from './Acctions';
import Tittle from './Tittle';
import Header from './Header';
import { FONT } from '../../../constain/fontFamilies';
import { getTenShorts } from '../ShortHttp'
import { getCmt } from '../../news/newsHttp';
import ShowImages from './ShowImages';
import ShowVideo from './ShowVideo';
import { UserContext } from '../../user/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const Shorts = () => {
  const videoRef = useRef < VideoRef > (null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useContext(UserContext);
  const { reloadUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  // swip
  const handleChangeIndex = useCallback(({ index }) => {
    console.log('Current index:', index);
    setCurrentIndex(index);
  }, []);

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await getTenShorts(limit, page);
      if (result && result.shorts) {
        setData((prevData) => [...prevData, ...result.shorts]);
        setPage((prevPage) => prevPage + 1);
      }
      console.log('ten', result.shorts?._id);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentIndex(-1);
      };
    }, [])
  );
  const handleLoadMore = async () => {
    if (!isLoading) {
      await fetchData();
      //console.log('handleLoadMore');

    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      await reloadUserData(user.user._id);
    }
    fetchUser()
  }, [currentIndex])
  const renderItem = useCallback(({ item, index }) => {
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
  }, [currentIndex]);
  return (
    <View style={styles.container}>
      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showPagination={false}
        onChangeIndex={handleChangeIndex}
        onEndReached={handleLoadMore} // Gọi hàm khi cuộn tới cuối danh sách
        onEndReachedThreshold={0.1} // Ngưỡng (threshold) kích hoạt loadMore (càng gần 1 càng sớm)
        ListFooterComponent={() =>
          isLoading ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Shorts

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
