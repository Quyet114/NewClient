import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'


const Explore = (props) => {
  const [keyword, setKeyword] = useState('')

  const onSearch = async (text) => {
    try {
      const result = await searchNews(text)
      console.log('>>>>>>result', result);
    } catch (error) {
      console.log('>>>>>>>>error', error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.explore}>Explore</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.fs16fw700lh22, styles.cl000]}>Topic</Text>
          <Text style={[styles.fs14fw400lh22, styles.cl4e4b66]}>See all</Text>
        </View>
        <View style={{ marginVertical: 8, padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Image style={{ width: 70, height: 70, borderRadius: 6, marginEnd: 8 }} source={require('../../../media/imgae/Heart.png')} />
          </View>
          <View style={{ width: 180, paddingEnd: 20 }}>
            <Text style={[styles.fs16fw400lh24ls012, styles.cl000, { marginBottom: 4 }]}>Health</Text>
            <Text style={[styles.fs14fw400lh21ls012, styles.cl4e4b66]} numberOfLines={2}>Get energizing workout moves, healthy recipes Get energizing workout moves, healthy recipes</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={[styles.fs16fw600lh24ls012, styles.save]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 8, padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Image style={{ width: 70, height: 70, borderRadius: 6, marginEnd: 8 }} source={require('../../../media/imgae/Heart.png')} />
          </View>
          <View style={{ width: 180, paddingEnd: 20 }}>
            <Text style={[styles.fs16fw400lh24ls012, styles.cl000, { marginBottom: 4 }]}>Technology</Text>
            <Text style={[styles.fs14fw400lh21ls012, styles.cl4e4b66]} numberOfLines={2}>The application of scientific knowledge to the practi the application of scientific knowledge to the practi</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={[styles.fs16fw600lh24ls012, styles.saved]}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 8, padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            {/* <Image style={{ width: 70, height: 70, borderRadius: 6, marginEnd: 8 }} source={require('../../../media/pictures/art.jpg')} /> */}
          </View>
          <View style={{ width: 180, paddingEnd: 20 }}>
            <Text style={[styles.fs16fw400lh24ls012, styles.cl000, { marginBottom: 4 }]}>Art</Text>
            <Text style={[styles.fs14fw400lh21ls012, styles.cl4e4b66]} numberOfLines={2}>Art is a diverse range of human activity, and result Art is a diverse range of human activity, and result</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={[styles.fs16fw600lh24ls012, styles.saved]}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={[styles.fs16fw700lh22, styles.cl000, { marginVertical: 8 }]}>Popular Topic</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.battleshipContainer}>
            {/* <Image style={styles.battleship} source={require('../../../media/pictures/battleship.png')} /> */}
          </View>
          <View>
            <Text style={styles.europe}>Europe</Text>
            <Text numberOfLines={1} style={styles.russian}>Russian warship: Moskva sinks in Black Sea</Text>
          </View>
          <View style={styles.cardNewsContainer}>
            <View style={styles.cardNews}>
              <Image style={styles.bbcIcon} source={require('../../../media/imgae/BBC.png')} />
              <Text style={styles.bbcLabel}>BBC News</Text>
              <Image style={styles.timeIcon} source={require('../../../media/imgae/Watch.png')} />
              <Text style={styles.timeLabel}>1h ago</Text>
            </View>
            <View>
              <Image source={require('../../../media/imgae/ThreeDot.png')} />
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.battleshipContainer}>
            {/* <Image style={styles.battleship} source={require('../../../media/pictures/battay2.png')} /> */}
          </View>
          <View>
            <Text style={styles.europe}>Europe</Text>
            <Text numberOfLines={1} style={styles.russian}>Russian warship: Moskva sinks in Black Sea</Text>
          </View>
          <View style={styles.cardNewsContainer}>
            <View style={styles.cardNews}>
            <Image style={styles.bbcIcon} source={require('../../../media/imgae/BBC.png')} />
              <Text style={styles.bbcLabel}>BBC News</Text>
              <Image style={styles.timeIcon} source={require('../../../media/imgae/Watch.png')} />
              <Text style={styles.timeLabel}>2h ago</Text>
            </View>
            <View>
            <Image source={require('../../../media/imgae/ThreeDot.png')} />
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.battleshipContainer}>
            {/* <Image style={styles.battleship} source={require('../../../media/pictures/technology.jpg')} /> */}
          </View>
          <View>
            <Text style={styles.europe}>Europe</Text>
            <Text numberOfLines={1} style={styles.russian}>Russian warship: Moskva sinks in Black Sea</Text>
          </View>
          <View style={styles.cardNewsContainer}>
            <View style={styles.cardNews}>
            <Image style={styles.bbcIcon} source={require('../../../media/imgae/BBC.png')} />
              <Text style={styles.bbcLabel}>BBC News</Text>
              <Image style={styles.timeIcon} source={require('../../../media/imgae/Watch.png')} />
              <Text style={styles.timeLabel}>3h ago</Text>
            </View>
            <View>
            <Image source={require('../../../media/imgae/ThreeDot.png')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Explore
const styles = StyleSheet.create({
  timeLabel: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4e4b66',
    marginStart: 4
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
    height: 20,
    borderRadius: 20
  },
  russian: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000',
    marginTop: 4
  },
  europe: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: 0.12
  },
  battleship: {
    width: '100%',
    height: 183,
    borderRadius: 6
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
  battleship: {
    width: '100%',
    height: 160,
    borderRadius: 6
  },
  cardContainer: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#FFF'
  },
  saved: {
    paddingVertical: 3,
    paddingHorizontal: 16,
    backgroundColor: '#1877f2',
    borderRadius: 6,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1877f2'
  },
  fs16fw600lh24ls012: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.12
  },
  save: {
    width: 78,
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1877f2',
    borderRadius: 6,
    color: '#1877f2',
    textAlign: 'center'
  },
  cl4e4b66: {
    color: '#4e4b66'
  },
  fs14fw400lh21ls012: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.12
  },
  cl000: {
    color: '#000'
  },
  fs16fw400lh24ls012: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.12
  },
  cl4e4b66: {
    color: '#4e4b66'
  },
  fs14fw400lh22: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.28
  },
  cl000: {
    color: '#000'
  },
  fs16fw700lh22: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.32
  },
  explore: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0.12,
    color: '#000'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 0
  }
})