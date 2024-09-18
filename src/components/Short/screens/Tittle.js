import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FONT } from '../../../constain/fontFamilies';

const { width } = Dimensions.get('window');

const Tittle = ({ data }) => {
  const [show, setShow] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef(null);
  //console.log(textHeight);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const [fontFamily, setFontFamily] = useState(FONT.primary);

  useEffect(() => {
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;

    setTextHeight(height < 70 ? 70 : height);
  };
  return (
    <View style={[styles.container, !show ? { width: '80%' } : { width: '98%' }]}>
      {show && <View style={[styles.overlay, { height: textHeight + 89 }]} />}
      <View style={[styles.content]}>
        <TouchableOpacity onPress={toggleShow} style={styles.toggleButton}>
          <Text style={[styles.toggleText, { fontFamily: fontFamily }]}>
            {show ? 'Hide' : 'Show more'}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.titleText, { fontFamily: fontFamily }]}
          numberOfLines={show ? undefined : 2}
        >{data.title}</Text>
        <ScrollView
          style={[styles.scrollView, { height: show ? textHeight : 70 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            ref={textRef}
            style={[styles.textHidden, { fontFamily: fontFamily }]}
            numberOfLines={show ? undefined : 3}
            onLayout={handleTextLayout}
          >
            {data.text}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 85,
    start: 0,
    flexDirection: 'column',
  },
  overlay: {
    position: 'absolute',
    bottom: -20,
    start: 0,
    width: width,
    height: 350,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  content: {
    marginStart: 8,
  },
  toggleButton: {
    marginVertical: 10,
  },
  toggleText: {
    color: 'white',
    fontFamily: FONT.primary,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT.primary,
  },
  scrollView: {
  },
  textHidden: {
    color: 'white',
    fontSize: 15,
    textAlign: 'justify',
    marginTop: 5,
    paddingBottom: 5
  },
});

export default Tittle;
