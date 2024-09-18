import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { updateReadCount } from './../ShortHttp';
import { getShortCmt } from '../../news/newsHttp';



const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const ShowImages = ({ data, isFocused }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);


  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        updateRead(data._id)

      }, 5000);
      return () => clearTimeout(timer);

    }
  }, [isFocused]);
  const updateRead = async (shortId) => {
    const resutl = await updateReadCount(shortId);
    if (resutl.status === 1) {
      console.log('updated: ', shortId);

    }
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <>
          <SwiperFlatList
            key={swiperKey}
            data={data.images}
            renderItem={({ item }) => (
              <View style={styles.imageContainer} key={item?.toString()}>
                <View key={item?.toString()}>
                  <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            onChangeIndex={({ index }) => setCurrentIndex(index)}
            autoplayLoop={true}
            autoplayDelay={4}
            autoplay={true}
          />
          <View style={styles.dotsContainer}>
            {data?.images?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentIndex ? 'blue' : 'white' },
                ]}
              />
            ))}
          </View>
        </>

      ) : (

        <>
          <View style={{ marginBottom: 78 }}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: data.images[0] }} style={styles.image} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.dotsContainer}>
            {data?.images?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentIndex ? 'blue' : 'white' },
                ]}
              />
            ))}
          </View>
        </>
      )}

    </View>
  )
}

export default ShowImages

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  imageContainer: {
    width: width,
    height: '100%',
    paddingBottom: 40
  },
  image: {
    width: width,
    height: '90%',
  },
})