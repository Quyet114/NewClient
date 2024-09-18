import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import ICON from 'react-native-vector-icons/Feather'
import { FONT } from '../../../constain/fontFamilies'
import { UserContext } from '../../user/UserContext'
import { createNewMusic } from '../MusicHttp'
import { useNavigation } from '@react-navigation/native'
const AddSong = ({ modelVisible, setModelVisible, musicUrl, setMusicUrl }) => {
  const user = useContext(UserContext);
  const [songName, setSongName] = useState('');
  const navigation = useNavigation();
  const cancelPublish = () => {
    if (musicUrl) {
      Alert.alert('Cancel Publish', 'Are you sure to cancel publish???', [
        {
          text: "Cancel", // Nút hủy
          style: "Cancel"
        },
        {
          text: "Confirm", // Nút xác nhận
          onPress: async () => {
            setModelVisible(false);
            setSongName('');
            setMusicUrl('');
          }
        }
      ],
        { cancelable: true })
    }
    console.log(musicUrl);

  }
  const publishMusic = async () => {
    const body ={
      name: songName,
      link: musicUrl,
      creator: user.user._id
    }
    const result = await createNewMusic(body.name, null, null, body.link, body.creator)
    if (result.status === 1) {
      console.log('publishMusic: ', result);
      Alert.alert('Use song?', 'Use this song for news?', [
        {
          text: "Cancel", // Nút hủy
          style: "Cancel"
        },
        {
          text: "Confirm", // Nút xác nhận
          onPress: async () => {
            navigation.navigate('AddNewShort', { music: result.music });
          }
        }
      ],
        { cancelable: true })
    }
    console.log('name: ', name,
      'link:', musicUrl,
      'creator:', user.user._id);

  }

  const chooseMussic = (item) => {

  }
  return (
    <Modal animationType='slide'
      transparent={true}
      visible={modelVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}>
      <View style={{ justifyContent: 'flex-end', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 20, alignItems: 'center' }}>
        <View style={{ height: '40%', width: '100%', backgroundColor: '#F5F5F5', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginStart: 15 }}>
              <ICON name='music' color={'black'} size={20} />
              <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black', marginStart: 10 }}>Create your music</Text>
            </View>
            <TouchableOpacity onPress={() => {
              cancelPublish()
            }} style={{ alignItems: 'center', height: 50, marginEnd: 15, justifyContent: 'center' }}>
              <ICON name="x" size={24} color={'black'} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>

            <TextInput
              value={songName}
              placeholder='Add name'
              style={styles.searchInput}
              onChangeText={(text) => setSongName(text)}
            >
            </TextInput>
            <TouchableOpacity onPress={() => {
              publishMusic()
            }} style={{ alignItems: 'flex-end', height: 50, padding: 5, width: '90%', backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 40 }}>
              <Text style={{ fontFamily: FONT.primary, fontSize: 20, color: 'white', marginStart: 10 }}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AddSong

const styles = StyleSheet.create({
  searchInput: {
    height: 48,
    width: '90%',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#4e4b66',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000',
    fontFamily: FONT.primary,
    marginTop: 10

  },
})