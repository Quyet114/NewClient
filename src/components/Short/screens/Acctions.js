import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react'
import ICON from 'react-native-vector-icons/AntDesign';
import { DateOfTimePost, FONT, formatNumber } from '../../../constain/fontFamilies';
import { updateLikes, updateDeleteLikes } from '../ShortHttp'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../user/UserContext';
import Comment from '../../Comment/Comment';
import { getShortCmt } from '../../news/newsHttp';
import Sound from 'react-native-sound';

const Acctions = ({ data, isFocused }) => {
  const [checkLike, setCheckLike] = useState(false);
  const [checkFollow, setCheckFollow] = useState(false);
  const user = useContext(UserContext);
  const [numLike, setNumLike] = useState(data.likes.length)
  const [numRead, setNumRead] = useState(data.reads)
  const followersWithStatus2 = user?.user?.follower;

  
  //cmt
  const [resetC, setResetC] = useState(false)
  const [show, setShow] = useState(false);
  const [cmtData, setCmtData] = useState([]);
  // music
  const [currentSound, setCurrentSound] = useState(null);


  useEffect(() => {
    if (followersWithStatus2) {
      const isFollowed = followersWithStatus2.some(follower =>
        follower.status === "2" && follower.followeeId === data.creator._id
      );
      setCheckFollow(isFollowed);
    }
    console.log('Acctions', isFocused);
  }, [isFocused]);
  const like = async () => {
    if (user?.user) {
      const result = await updateLikes(data._id, user.user._id)
      //console.log('updated',data._id, user.user?._id);
      if (result.status === 1) {
        console.log('updated', data._id, user.user._id);
        setCheckLike(true);
        setNumLike(pre => pre + 1)

      }
    } else {
      Alert.alert('You are guest ', 'Login to send acctions')
    }

  }
  const dislike = async () => {
    const result = await updateDeleteLikes(data._id, user.user._id)
    if (result.status === 1) {
      console.log('updated');
      setNumLike(pre => pre - 1)
      setCheckLike(false);
    }
  }
  useEffect(() => {
    if (user?.user?.watchHistory && isFocused) {
      for (const watchHistory of user?.user?.watchHistory) {
        if (watchHistory == data._id) {
          setCheckLike(true);
          break; // Dừng vòng lặp khi tìm thấy
        }
      }
    }
  }, [isFocused]);

  const handleSomeAction = () => {
    if (isFocused) {
      setShow(true);
    }
  };
  // comments data
  useEffect(() => {
    if (isFocused) {
      getComment(data._id)
    }

  }, [resetC, isFocused == true])
  const getComment = async (id) => {
    const result = await getShortCmt(id)
    if (result) {
      setCmtData(result)
      console.log('cmt: ', result);
      console.log(id);

    }
  };
  // music

  const playSoundFromUrl = () => {
    if (currentSound) {
      currentSound.stop();
    }
    const sound = new Sound(`${data.music?.url}`, null, (error) => {
      if (error) {
        console.log('Không thể tải âm thanh:', error);
        return;
      }
      if (isFocused && data.type === 1) {
        sound.play((success) => {
          if (success) {
            console.log('Phát âm thanh thành công');
          } else {
            console.log('Phát âm thanh thất bại');
          }
        });
        setCurrentSound(sound);
        // Lặp lại âm thanh
        sound.setNumberOfLoops(-1);
      } else {
        sound.setNumberOfLoops(0);
        sound.stop(() => {
          console.log('Âm thanh đã dừng lại do mất focus');

        });
        sound.release();
      }
    });
    sound.setCurrentTime(2)
  };
  useEffect(() => {
    if (data.music?.url) {
      playSoundFromUrl();
    }
  }, [isFocused, data]);

  return (
    <View style={styles.container}>
      {isFocused && (<Comment creator={data.creator._id} show={show} setShow={setShow} data={cmtData} shortId={data._id} setResetC={setResetC}
        onPressClose={() => setShow(false)}
      />)}
      <View style={styles.user}>
        <Image source={{ uri: data.creator.avatar }} style={{ height: 35, width: 35, borderRadius: 35, marginBottom: 2 }} />
        {!checkFollow && (<ICON name='pluscircleo' size={18} color={'red'} />)}

      </View>
      <View style={styles.options}>
        {checkLike ?
          <TouchableOpacity
            onPress={() => { dislike() }}
          >
            <ICON name='heart' color={'red'} size={28} />
          </TouchableOpacity>

          :
          <TouchableOpacity
            onPress={() => { like() }}
          >
            <ICON name='hearto' color={'white'} size={28} />
          </TouchableOpacity>

        }
        <Text style={{ color: 'white', fontFamily: FONT.primary, fontSize: 18, marginBottom: 15 }}>{formatNumber(numLike)}</Text>
        <TouchableOpacity
          onPress={handleSomeAction}
        >
          <ICON name="message1" size={22} color={'white'} />
        </TouchableOpacity>

        <Text style={{ color: 'white', fontFamily: FONT.primary, fontSize: 18, marginBottom: 15 }}>{formatNumber(cmtData?.length)}</Text>
        <ICON name="eyeo" size={22} color={'white'} />
        <Text style={{ color: 'white', fontFamily: FONT.primary, fontSize: 18, marginBottom: 15 }}>{formatNumber(numRead)}</Text>
        <ICON name="sharealt" size={22} color={'white'} />
        <Text style={{ color: 'white', fontFamily: FONT.primary, fontSize: 18, marginBottom: 30 }}>{formatNumber(data.likes.length)}</Text>
        <ICON name="playcircleo" size={22} color={'white'} />
        {data.music?.url && (<Text
          numberOfLines={1}
          style={{ color: 'white', fontFamily: FONT.primary, fontSize: 12, marginBottom: 30 }}
        >
          {data.music?.name}
        </Text>)}
      </View>
    </View>
  )
}

export default Acctions

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    end: 0,
    bottom: 0,
    width: '16%',
    height: '60%'
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  options: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },

})